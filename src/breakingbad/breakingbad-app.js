const baseURL = 'https://api.breakingbadquotes.xyz/v1';

/**
 * @returns {Object} quote information
 */
const fetchQuote = async () => {
    const response = await fetch(`${baseURL}/quotes`);
    const data = await response.json();
    return data[0];
}

const createElements = (element) => {
    const qbQuote = document.createElement('quoteblock');
    qbQuote.id = 'qbQuote';
    const h3Author = document.createElement('h3');
    h3Author.id = 'h3Author';
    const btnNextQuote = document.createElement('button');
    btnNextQuote.id = 'btnNextQuote';
    btnNextQuote.innerText = 'Next Quote';
    element.replaceChildren(qbQuote, h3Author, btnNextQuote);
}

const setQuoteValues = (data) => {
    const qbQuote = document.querySelector('#qbQuote');
    qbQuote.innerText = data.quote;
    const h3Author = document.querySelector('#h3Author');
    h3Author.innerText = data.author;
}

const btnListener = () => {
    const btnNextQuote = document.querySelector('#btnNextQuote');
    btnNextQuote.addEventListener('click', async () => {
        await newQuote();
    });
}

const newQuote = async () => {
    const btnNextQuote = document.querySelector('#btnNextQuote');
    const h3Author = document.querySelector('#h3Author');
    const qbQuote = document.querySelector('#qbQuote');
    btnNextQuote.disabled = true;
    h3Author.innerText = 'waiting...';
    qbQuote.innerText = 'loading...';
    const data = await fetchQuote();
    setQuoteValues(data);
    btnNextQuote.disabled = false;
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
const BreakingBadApp = async (element) =>{
    element.innerHTML = 'Loading...';
    createElements(element);
    const data = await fetchQuote();
    setQuoteValues(data);
    btnListener();
}

export {
    BreakingBadApp
}