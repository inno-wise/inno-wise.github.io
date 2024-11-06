const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle video download
app.get('/download', async (req, res) => {
    const url = req.query.url;
    const formatType = req.query.format || 'best';  // Default format is 'best'

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).send("Invalid YouTube URL");
    }

    try {
        const info = await ytdl.getInfo(url);
        let format;

        if (formatType === 'audio') {
            format = ytdl.filterFormats(info.formats, 'audioonly')[0];  // Audio-only format
        } else if (formatType === 'best') {
            // Default to best video quality
            format = ytdl.filterFormats(info.formats, 'audioandvideo').find(f => f.hasVideo && f.hasAudio);
        } else {
            // Allow users to choose specific resolutions (e.g., 720p, 1080p)
            format = ytdl.filterFormats(info.formats, 'video')[0];  // Default to first available video format
            if (formatType === '720p') {
                format = info.formats.find(f => f.resolution === '720p' && f.hasVideo && f.hasAudio);
            } else if (formatType === '1080p') {
                format = info.formats.find(f => f.resolution === '1080p' && f.hasVideo && f.hasAudio);
            }
        }

        if (!format) {
            return res.status(400).send("No suitable format found.");
        }

        res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.${format.container}"`);
        res.header('Content-Type', format.mimeType);

        ytdl(url, { format: format })
            .pipe(res)
            .on('finish', () => {
                console.log('Download completed');
            });

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing the video.");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
