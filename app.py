from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sudoku_game.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Custom Puzzle model
class CustomPuzzle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    puzzle = db.Column(db.String(255), nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

# Register route
@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username')
    password = request.form.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User already exists!"}), 400
    
    hashed_pw = generate_password_hash(password)
    new_user = User(username=username, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully!"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password!"}), 401
    
    return jsonify({"message": "Login successful!"}), 200

# Save custom puzzle
@app.route('/save_custom_puzzle', methods=['POST'])
def save_custom_puzzle():
    data = request.json
    puzzle = json.dumps(data.get('puzzle'))

    new_puzzle = CustomPuzzle(puzzle=puzzle)
    db.session.add(new_puzzle)
    db.session.commit()

    return jsonify({"message": "Custom puzzle saved!"}), 200

# Fetch saved puzzles
@app.route('/get_saved_puzzles', methods=['GET'])
def get_saved_puzzles():
    puzzles = CustomPuzzle.query.all()
    puzzles_list = [json.loads(puzzle.puzzle) for puzzle in puzzles]
    return jsonify({"puzzles": puzzles_list}), 200

if __name__ == '__main__':
    db.create_all()  # Creates database tables
    app.run(debug=True)
