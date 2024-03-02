import {client} from 'tenorjs'
const apiKey = "AIzaSyC7F3JeSjdFrYq3ehoskvgJXHWtbe-Tz7w";
const Tenor = client({
    Key: apiKey,
    Filter: "off",
    Locale: "en_US",
    MediaFilter: "minimal",
})
export default Tenor