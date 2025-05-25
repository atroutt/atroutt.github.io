function loadPageSpecificContent(pageName) {
  // 1. Content Loading
  const contentPath = 'content/' + pageName + '.md';
  const targetElement = document.getElementById('page-content');

  if (!targetElement) {
    console.error('Target element "page-content" not found.');
    return;
  }

  fetch(contentPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load ' + contentPath + ': ' + response.statusText);
      }
      return response.text();
    })
    .then(markdownText => {
      targetElement.innerHTML = marked.parse(markdownText);
    })
    .catch(error => {
      console.error('Error fetching or parsing ' + contentPath + ':', error);
      targetElement.innerHTML = '<p>Error loading content. Please try again later.</p>';
    });

  // 2. Style Application
  // Ensure the section is visible
  targetElement.style.display = 'block';

  let bgColor, textColor;
  switch (pageName) {
    case 'speaking':
      bgColor = '#969C6B'; // Muted olive
      textColor = '#FFFFFF';
      break;
    case 'writing':
      bgColor = '#936BB0'; // Muted purple
      textColor = '#FFFFFF';
      break;
    case 'teaching':
      bgColor = '#DEF056'; // Lime
      textColor = '#434535';
      break;
    default:
      // Default styles or no styles if pageName doesn't match
      bgColor = ''; // Or a default background
      textColor = ''; // Or a default text color
  }
  targetElement.style.backgroundColor = bgColor;
  targetElement.style.color = textColor;

  // 3. Active Navigation Link
  const navLinks = document.querySelectorAll('#main-nav a.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Construct the href for the active link, e.g., "speaking.html"
  const activeLinkHref = '/' + pageName + '/'; // <--- MODIFIED LINE
  const activeLink = document.querySelector('#main-nav a.nav-link[href="' + activeLinkHref + '"]');
  if (activeLink) {
    activeLink.classList.add('active');
  }
}
