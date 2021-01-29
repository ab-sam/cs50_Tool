Steps to be followed:
    1. Running twitter proxy in command prompt (by using the twitter API keys&tokens):
        twitter-proxy "config.json full path"
    2. Opening homepage.html in browser.
    3. Selecting the API to work on:
        Select either tmdb or twitter.
    4. Enter a keyword to search:
        In tmdb, this keyword is matched with movie/tv series name to fetch result,
        In twitter, this keyword is matched with text in tweets of all public users
        and returns first 100 tweet results.
    5. Use Fetch Data button.
        Once the data is fetched, the output box will display a message as such.
    6. Select one of the columns to work with.
    7. Use one of the options from summary dropdown to perform the required statistics.
    8. Finally, using the Get Stats button will display the required result as a table in
    output box.



The application developed here helps user to analyse the following info:
    1. In TMDB:
        getting sum/count/mean/median/null count/standard deviation/all for a specified 
        result (like id/title/vote average/vote count/popularity)
    2. In TWITTER:
        getting sum/count/mean/median/null count/standard deviation/all for a specified 
        result such as favourite count/retweet_count.
and uses two different API's namely tmdb API, twitter API.

The documentation for creating Access token and Extracting data from API can be found in the links below. 
Twitter API:  https://developer.twitter.com/en/docs/twitter-api
TMDB API: https://developers.themoviedb.org/3


Tools used:
Javascript for fetching data from API, running summary functions
HTML & CSS for front-end dashboard tool
