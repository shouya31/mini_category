window.addEventListener('load', () => {
  const selectWrap = document.getElementById('select-wrap')
  const parentCategory = document.getElementById('parent-category')

  // 子カテゴリーのプルダウンを表示させる関数
  const appendChildSelect = (items) => {

    const childWrap = document.createElement('div')
    childWrap.setAttribute('id', 'child-select-wrap')
    const childSelect = document.createElement('select')

    childSelect.setAttribute('id', 'child-select')

    childWrap.appendChild(childSelect)

    items.forEach((item, i) => {
      const childOption = document.createElement('option')
      childOption.innerHTML = item.name
      childOption.setAttribute('value', i+1)

      childSelect.appendChild(childOption)
    });
    selectWrap.appendChild(childWrap)
  }

    // 孫カテゴリーのプルダウンを表示させる関数
    const appendGrandChildSelect = (items) => {

      const childWrap = document.getElementById('child-select-wrap')
      const grandchildWrap = document.createElement('div')
      grandchildWrap.setAttribute('id', 'grand-child-select-wrap')

      const grandchildSelect = document.createElement('select')

      grandchildSelect.setAttribute('id', 'child-select')

      grandchildWrap.appendChild(grandchildSelect)
      items.forEach((item, i) => {
        const grandchildOption = document.createElement('option')
        grandchildOption.innerHTML = item.name
        grandchildOption.setAttribute('value', i+1)

        grandchildSelect.appendChild(grandchildOption)
      });
      childWrap.appendChild(grandchildWrap)
    }

  parentCategory.addEventListener('change', () => {
    if (document.getElementById('child-select-wrap') !== null ) {
      document.getElementById('child-select-wrap').remove()
    }
    const parentValue = parentCategory.value
    const XHR = new XMLHttpRequest();
    XHR.open("GET", `/search/${parentValue}`, true);
    XHR.responseType = "json";
    XHR.send();
    XHR.onload = () => {
      const items = XHR.response.item;
      console.log(items)
      appendChildSelect(items)

      const childCategory = document.getElementById('child-select')
      childCategory.addEventListener('change', () => {
        if (document.getElementById('grand-child-select-wrap') !== null ) {
          document.getElementById('grand-child-select-wrap').remove()
        }
        const childValue = childCategory.value
        XHR.open("GET", `/search/${childValue}`, true);
        XHR.responseType = "json";
        XHR.send();
        XHR.onload = () => {
          const GrandChildItems = XHR.response.item;
          console.log(GrandChildItems)
          appendGrandChildSelect(GrandChildItems)
        }
      })
    }
  })
})