(function() {

  var PLUGIN_NAME = "amilia_button",
      AMILIA_URL = "http://www.amilia.com",
      IMAGE_BASE_URL = "http://app.amilia.com/buttons",
      COLORS = {g: '#40d892', dg: '#28b172', b: '#46aaf8', db: '#158ae5', o: '#fba16b', r: '#fb5b5b', y: '#fce162', steel: '#8294ab'};

  tinyMCE.addI18n("en.amilia_button", {
    "modal-title": "Button for Redirection to Amilia",
    "url-label": "Store URL",
    "insert": "Insert",
    "update": "Update",
    "delete": "Remove",
    "close": "Close",
    "text": "Button text",
    "text-value": "Register online",
    "powered-text": "Powered by",
    "image": "Image",
    "color": "Color",
    "language": "Language",
    "g": "Green",
    "dg": "Dark Green",
    "b": "Blue",
    "db": "Dark Blue",
    "o": "Orange",
    "r": "Red",
    "y": "Yellow",
    "steel": "Steel",
    "check": "Check",
    "edit": "Pencil",
    "lock": "Lock",
    "french": "French",
    "english": "English",
    "error-invalid-url": "Please enter a valid URL",
    "error-invalid-text": "Please type in the button text",
    "help": "Help",
    "instructions": "Instructions",
    "instructions-p1": "Navigate to the page of your store, or the registration page. Copie the URL from the address bar, and paste in the field URL.",
    "instructions-p2": "Choose the color, the image, the text and language. Then insert the button on your page.",
    "instructions-p3": "You can modify or remove it later, by positioning the cursor on the Amilia button. Click again on the Amilia tool icon."
  });

  tinyMCE.addI18n("fr.amilia_button", {
    "modal-title": "Bouton de redirection Amilia",
    "url-label": "URL de votre boutique",
    "insert": "Insérer",
    "update": "Mise à jour",
    "delete": "Effacer",
    "close": "Fermer",
    "text": "Texte du bouton",
    "text-value": "Inscription en ligne",
    "powered-text": "Propulsé par",
    "image": "Image",
    "color": "Couleur",
    "language": "Langue",
    "g": "Vert",
    "dg": "Vert foncé",
    "b": "Bleu",
    "db": "Bleu foncé",
    "o": "Orange",
    "r": "Rouge",
    "y": "Jaune",
    "steel": "Gris bleu",
    "check": "Crochet",
    "edit": "Crayon",
    "lock": "Cadenas",
    "french": "Français",
    "english": "Anglais",
    "error-invalid-url": "Veuillez entrer un URL valide",
    "error-invalid-text": "Veuillez entrer le texte du bouton",
    "help": "Aide",
    "instructions": "Instructions",
    "instructions-p1": "Naviguer vers la page de votre boutique ou vers la page d'inscription. Copier l'addresse (URL) de votre navigateur, et coller là dans le champs URL.",
    "instructions-p2": "Choisir la couleur, l'image, le texte et la langue. Ensuite l'insérer dans votre page.",
    "instructions-p3": "Vous pourez le modifier ou l'effacer plus tard, en poisitionnant le curseur sur le bouton Amilia, et en cliquant sur l'outil Amilia."
  });

  var modalTemplate = [
    '<h3>{modal-title}</h3>',
    '<div>',
    '  <label>{url-label} <a class="amilia-help1" href="#">(?)</a></label>',
    '  <input type="text" name="store-url" />',
    '</div>',
    '<div>',
    '  <div class="amilia-left">',
    '    <div>',
    '      <label>{color}</label>',
    '      <select name="color">',
    '        <option value="g">{g}</option>',
    '        <option value="dg">{dg}</option>',
    '        <option value="b">{b}</option>',
    '        <option value="db">{db}</option>',
    '        <option selected="selected" value="o">{o}</option>',
    '        <option value="r">{r}</option>',
    '        <option value="y">{y}</option>',
    '        <option value="steel">{steel}</option>',
    '      </select>',
    '    </div>',
    '    <div>',
    '      <label>{image}</label>',
    '      <select name="image">',
    '        <option selected="selected" value="check">{check}</option>',
    '        <option value="edit">{edit}</option>',
    '        <option value="lock">{lock}</option>',
    '      </select>',
    '    </div>',
    '    <div>',
    '      <label>{text}</label>',
    '      <input type="text" name="text" value="{text-value}" />',
    '    </div>',
    '    <div>',
    '      <label>{language}</label>',
    '      <select name="language">',
    '        <option selected="selected" value="en">{english}</option>',
    '        <option value="fr">{french}</option>',
    '      </select>',
    '    </div>',
    '  </div>',
    '  <div class="amilia-right">',
    '    <div id="amilia-button-preview" class="amilia-button-wrapper" style="width:175px; display:inline-block;"></div>',
    '  </div>',
    '</div>',
    '<div class="amilia-buttons">',
    '  <button name="insert">{insert}</button>',
    '  <button name="update">{update}</button>',
    '  <button name="delete">{delete}</button>',
    '  <button name="cancel">{close}</button>',
    '  <a class="amilia-help2" href="#">{help}</a>',
    '  <div class="clear"></div>',
    '</div>',
    '<div class="amilia-instructions" style="display:none;">',
    '  <h3>{instructions}</h3>',
    '  <p>{instructions-p1}</p>',
    '  <p>{instructions-p2}</p>',
    '  <p>{instructions-p3}</p>',
    '</div>'
  ].join("\n");

  var buttonTemplate = [
    '<a class="amilia-button" href="{url}" style="color:{color}; background:{backgroundColor} url(\'{imageUrl}\') no-repeat 10px 10px; border-radius:2px; font:bold 13px/16px arial; text-indent:0; height:40px; width:175px; text-decoration:none; position:relative; display:table; *display:inline-block;">',
      '<span style="display:block; *position:absolute; *top:50%; display:table-cell; vertical-align:middle; *width:175px;">',
        '<span style="display:block; *position:relative; *top:-50%; padding-left:45px;">',
          '{text}',
        '</span>',
      '</span>',
    '</a>',
    '<span style="display:block; text-align:right; padding:2px 4px 0 0; color:#696969; font:11px/15px arial;">',
      '{poweredText} <a class="amilia-powered-by" href="{amiliaUrl}" target="_blank" style="color:#696969;">Amilia.com</a>',
    '</span>'
  ].join('');

  function lang(key, lang) {
    lang || (lang = tinymce.activeEditor.settings.language);
    if (lang != "fr") lang = "en";
    return tinymce.i18n[lang + '.' + PLUGIN_NAME + '.' + key] || key;
  }

  function localize(template) {
    return template.replace(/{([a-zA-Z0-9-_]+)}/g, function($0, $1) {
        return lang($1);
    });
  }

  function validateUrl(url) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
  };

  function validateText(text) {
    return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '').length > 0;
  };


  tinymce.PluginManager.add(PLUGIN_NAME, function(editor, url) {
    tinymce.DOM.loadCSS(url + "/amilia-button.css");
    modalTemplate = localize(modalTemplate);


    // The modal
    var mask = document.createElement("div");
    mask.id = "amilia-mask";
    document.body.appendChild(mask);
    mask.style.display = "none";

    var modal = document.createElement("div");
    modal.id = "amilia-modal";
    document.body.appendChild(modal);
    modal.innerHTML = modalTemplate;
    modal.style.display = "none";

    var storeUrl = modal.querySelector("input[name=store-url]"),
        color = modal.querySelector("select[name=color]"),
        image = modal.querySelector("select[name=image]"),
        text = modal.querySelector("input[name=text]"),
        language = modal.querySelector("select[name=language]"),
        preview = modal.querySelector("#amilia-button-preview"),
        insertButton = modal.querySelector("button[name=insert]"),
        updateButton = modal.querySelector("button[name=update]"),
        deleteButton = modal.querySelector("button[name=delete]"),
        cancelButton = modal.querySelector("button[name=cancel]"),
        help1 = modal.querySelector("a.amilia-help1"),
        help2 = modal.querySelector("a.amilia-help2"),
        instructions = modal.querySelector(".amilia-instructions"),
        activeElement = null;

    function generateRawHtml(no_wrapper) {
      var html = buttonTemplate
        .replace('{url}', storeUrl.value)
        .replace('{color}', COLORS[color.value] == 'y' ? '#494949' : '#ffffff')
        .replace('{backgroundColor}', COLORS[color.value])
        .replace('{imageUrl}', IMAGE_BASE_URL + "/" + image.value + ".png")
        .replace('{text}', text.value)
        .replace('{poweredText}', lang("powered-text", language.value))
        .replace('{amiliaUrl}', AMILIA_URL + "/" + tinymce.activeEditor.settings.language);
      if (!no_wrapper) html = '<div class="amilia-button-wrapper" style="width:175px;">' + html + '</div>';
      return html;
    }

    function updatePreview() {
      preview.innerHTML = generateRawHtml(true);
    }

    function validate() {
      if (!validateUrl(storeUrl.value)) {
        alert(lang("error-invalid-url"));
        return false;
      }
      if (!validateText(text.value)) {
        alert(lang("error-invalid-text"));
        return false;
      }
      return true;
    }

    function close(e) {
      mask.style.display = "none";
      modal.style.display = "none";
    }

    color.onchange = image.onchange =  text.onchange = language.onchange = updatePreview;
    insertButton.onclick = function(e) {
      if (!validate()) return;
      editor.execCommand("mceInsertRawHTML", false, generateRawHtml());
      close();
    };
    updateButton.onclick = function(e) {
      if (!validate()) return;
      activeElement.innerHTML = "";
      editor.execCommand("mceRemoveNode", false, activeElement);
      editor.execCommand("mceInsertRawHTML", false, generateRawHtml());
      close();
    }
    deleteButton.onclick = function(e) {
      activeElement.innerHTML = "";
      editor.execCommand("mceRemoveNode", false, activeElement);
      close();
    }
    cancelButton.onclick = close;
    mask.onclick = close;
    help1.onclick = help2.onclick = function(e) {
      e.preventDefault();
      instructions.style.display = "block";
      return false;
    }

    function getActiveElement() {
      return editor.dom.getParent(editor.selection.getNode(), "div.amilia-button-wrapper");
    }

    function showModal() {
      activeElement = getActiveElement();
      if (activeElement) {
        storeUrl.value = activeElement.querySelector("a.amilia-button").href;
        insertButton.style.display = "none";
        updateButton.style.display = "inline";
        deleteButton.style.display = "inline";
      } else {
        insertButton.style.display = "inline";
        updateButton.style.display = "none";
        deleteButton.style.display = "none";
      }
      mask.style.display = "block";
      modal.style.display = "block";
      modal.style.left = window.innerWidth/2 - modal.offsetWidth/2 + "px";
      updatePreview();
    }


    // The TineMCE button
    var buttonSettings = {
      onclick: showModal
    };

    if (tinymce.majorVersion < 4) {
      buttonSettings.title = "Amilia Button";
      buttonSettings.image = url + "/amilia-button.png";
    } else {
      buttonSettings.tooltip = "Amilia Button";
      buttonSettings.icon = url + "/amilia-button.png";
    }

    editor.addButton(PLUGIN_NAME, buttonSettings);
    editor.onNodeChange.add(function(editor, controllManager, node) {
      controllManager.setActive(PLUGIN_NAME, getActiveElement() != null);
    });

  });
  
})();
