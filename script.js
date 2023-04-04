// manipulating the dom
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const authorText = document.getElementById("author");
const loader=document.getElementById("loader");
let checker=0;
// Get quotes from api
let apiQuotes = [];

// show loading 
const loading=()=>{
  loader.hidden=false;
  quoteContainer.hidden=true;
}
// hide loading
const complete=()=>{
   if(!loader.hidden){
    quoteContainer.hidden=false;
    loader.hidden=true;
   }
}
// get quotes
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    loading();
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // if author is blank
    if (quote.author === null) {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = quote.author;
    }
    // reduce font size for long quotes
    if (quote.text.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = quote.text;
    complete();
  } catch (error) {
    // catch error
  if(checker<10){
    getQuotes();
    checker++;
  }
  else{
  throw new Error("oops");
  }
  }
};
// tweet quote
const tweetQuote=()=>{
  const quote=quoteText.innerText;
   const author=authorText.innerText;
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quote}-${author}`;
  window.open(twitterUrl,'_blank')
}


// Event listeners

newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);

// on load
getQuotes();
