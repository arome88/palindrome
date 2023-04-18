function checkPalindrome() {
  const wordInput = document.getElementById('inputWord').value

  console.log(wordInput)

  fetch(`/palindrome?palindrome=${wordInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      document.querySelector('#answer').textContent = data.isPalindrome
    })
}

document.getElementById('button').addEventListener('click', checkPalindrome)
