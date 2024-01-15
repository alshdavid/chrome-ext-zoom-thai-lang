(() => {
    // Styles to apply
    const styles = {
      fontSize: '30px',
      fontFamily: '"Noto Serif Thai", serif',
    }
  
    // Add fonts if they don't exist
    // const font_url = "https://fonts.googleapis.com/css2?family=Noto+Serif+Thai&display=swap";
    // if (!document.head.querySelector(`link[href="${font_url}"]`)) {
    //   document.head.innerHTML += `<link href="${font_url}" rel="stylesheet">`;
    // }
  
    // Look for these Characters
    const chars = "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ".split("");
  
    function resize_thai_script() {
      // List of elements with Thai characters in them
      const elements_to_update = new Set();
  
      // Scan the page for elements that contain those characters
      (function walk_elements(target) {
      for (const el of Array.from(target.querySelectorAll("*"))) {
          // Custom Elements
          if (el.shadowRoot) {
          walk_elements(el.shadowRoot);
          }
  
          // Only look at the text of the current element and not the children
          let top_level_text = "";
  
          for (var i = 0; i < el.childNodes.length; i++) {
          if (el.childNodes[i].nodeType == Node.TEXT_NODE) {
              top_level_text += el.childNodes[i].data;
          }
          }
  
          // does the top level text contain any Thai characters?
          for (const char of chars) {
          if (top_level_text.includes(char)) {
              elements_to_update.add(el);
              break;
          }
          }
      }
      })(document.body);
  
      // Apply styles to found elements
      for (const el of elements_to_update.values()) {
        for (const [k, v] of Object.entries(styles)) {
          el.style[k] = v
        }
      }
    }
  
    resize_thai_script()
  
    // Automatically run whenever there are changes to the page
    if (window.thai_observer) {
      window.thai_observer.disconnect()
    }
    window.thai_observer = new MutationObserver((e) => resize_thai_script())
    window.thai_observer.observe(document.body, { 
      attributes: false,
      childList: true,
      characterData: true,
      subtree: true,
    });
  })();
  