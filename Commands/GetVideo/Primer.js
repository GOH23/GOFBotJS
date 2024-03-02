
import Parser from 'rss-parser';

const parser = new Parser();
export function Primer() {
    return parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCnn3xWZM8llVzGOn4uKiFRQ")
}