document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    console.log('ICI');
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
  })
  
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    console.log('Là');
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
  })