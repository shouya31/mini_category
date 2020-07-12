window.addEventListener('load', () => {
  const selectWrap = document.getElementById('select-wrap')
  const parentCategory = document.getElementById('parent-category')
  const XHR = new XMLHttpRequest();

  // 指定した要素が存在する場合、その要素を削除する関数
  const deleteChildElement = (element) => {
    if (document.getElementById(element) !== null ) {
      document.getElementById(element).remove()
    }
  }

  // XHRを用いた通信を行う関数
  const execXHR = (id) => {
    XHR.open("GET", `/search/${id}`, true);
    XHR.responseType = "json";
    XHR.send();
  }

  // カテゴリーの子の値を全て取得する関数
  const getChildCategoryData = () => {
    const parentValue = parentCategory.value
    execXHR(parentValue)
    XHR.onload = () => {
      const items = XHR.response.item;
      appendChildSelect(items)

      const childCategory = document.getElementById('child-select')

      // 子プルダウンの値が変化によってイベント発火する
      childCategory.addEventListener('change', () => {
        deleteChildElement('grand-child-select-wrap')
        getGrandchildCategoryData(childCategory)
      })
    }
  }

  // カテゴリーの孫の値を全て取得する関数
  const getGrandchildCategoryData = (childCategory) => {
    const childValue = childCategory.value
    execXHR(childValue)
    XHR.onload = () => {
      const GrandChildItems = XHR.response.item;
      appendGrandChildSelect(GrandChildItems)
    }
  }

  // 子カテゴリーのプルダウンを表示させる関数
  const appendChildSelect = (items) => {

    const childWrap = document.createElement('div')
    const childSelect = document.createElement('select')

    childSelect.setAttribute('id', 'child-select')
    childWrap.setAttribute('id', 'child-select-wrap')

    items.forEach((item, i) => {
      const childOption = document.createElement('option')
      childOption.innerHTML = item.name
      childOption.setAttribute('value', i+1)

      childSelect.appendChild(childOption)
    });

    childWrap.appendChild(childSelect)
    selectWrap.appendChild(childWrap)
  }

    // 孫カテゴリーのプルダウンを表示させる関数
    const appendGrandChildSelect = (items) => {

      const childWrap = document.getElementById('child-select-wrap')
      const grandchildWrap = document.createElement('div')
      const grandchildSelect = document.createElement('select')

      grandchildWrap.setAttribute('id', 'grand-child-select-wrap')
      grandchildSelect.setAttribute('id', 'child-select')

      items.forEach((item, i) => {
        const grandchildOption = document.createElement('option')
        grandchildOption.innerHTML = item.name
        grandchildOption.setAttribute('value', i+1)

        grandchildSelect.appendChild(grandchildOption)
      });

      grandchildWrap.appendChild(grandchildSelect)
      childWrap.appendChild(grandchildWrap)
    }

    // 親プルダウンの値が変化によってイベント発火する
  parentCategory.addEventListener('change', () => {
    deleteChildElement('child-select-wrap')
    getChildCategoryData()
  })
})