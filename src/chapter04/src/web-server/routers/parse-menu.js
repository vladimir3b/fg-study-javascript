const siteStructure = require('./../../../.config/site-structure.json');

function link(page_code) {
  return siteStructure.pages.find(page => page.code === page_code)
}

module.exports = function () {
  return siteStructure.menu.map(item => {
    // console.log(item.pages);
    return {
      title: item.title,
      icon: item.icon,
      pages: (item.pages.length !== 1) ? item.pages.map(page_code => {
        const searchedPage = link(page_code);
        return {
          title: searchedPage.title,
          url: searchedPage.route
        };
      }) : {
        title: link(item.pages[0]).title,
        url: link(item.pages[0]).route
      },
      unique: item.pages.length === 1
   }
  });
}