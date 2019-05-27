function link(page_code, siteStructure) {
  return siteStructure.pages.find(page => page.code === page_code)
}

module.exports = function (siteStructure) {
  return siteStructure.menu.map(item => {
    return {
      title: item.title,
      icon: item.icon,
      pages: (item.pages.length !== 1) ? item.pages.map(page_code => {
        const searchedPage = link(page_code, siteStructure);
        return {
          title: searchedPage.title,
          url: searchedPage.route
        };
      }) : {
          title: link(item.pages[0], siteStructure).title,
          url: link(item.pages[0], siteStructure).route
      },
      unique: item.pages.length === 1
   }
  });
}