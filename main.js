(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===e(i)?i:String(i)),o)}var i}var n=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._templateSelector=n,this._name=t.name,this._link=t.link,this._handleCardClick=r}var n,r;return n=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_changeLike",value:function(e){e.addEventListener("click",(function(){e.classList.toggle("element__like-btn_active")}))}},{key:"_removeCard",value:function(e){var t=this;e.addEventListener("click",(function(){return t._cloneElement.remove()}))}},{key:"_setEventListeners",value:function(){var e=this;this._changeLike(this._cloneElement.querySelector(".element__like-btn")),this._removeCard(this._cloneElement.querySelector(".element__trash-btn")),this._elementImage.addEventListener("click",(function(){return e._handleCardClick()}))}},{key:"createCard",value:function(){return this._cloneElement=this._getTemplate(),this._elementImage=this._cloneElement.querySelector(".element__image"),this._cloneElement.querySelector(".element__title").textContent=this._name,this._elementImage.src=this._link,this._elementImage.alt=this._name,this._setEventListeners(),this._cloneElement}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var u=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._formElement=n}var t,n;return t=e,(n=[{key:"_showError",value:function(e,t){t.classList.add(this._config.inputErrorClass),t.textContent=e.validationMessage}},{key:"_hideError",value:function(e,t){t.classList.remove(this._config.inputErrorClass),t.textContent=e.validationMessage}},{key:"_checkInputValidity",value:function(e){e.setCustomValidity("");var t=this._formElement.querySelector("#".concat(e.name,"-error"));e.validity.valid?this._hideError(e,t):this._showError(e,t)}},{key:"_disabledButton",value:function(e){e.disabled="disabled",e.classList.add(this._config.inactiveButtonClass)}},{key:"_enabledButton",value:function(e){e.disabled=!1,e.classList.remove(this._config.inactiveButtonClass)}},{key:"toggleButtonState",value:function(){this._formElement.checkValidity()?this._enabledButton(this._submitButtonElement):this._disabledButton(this._submitButtonElement)}},{key:"_setEventListener",value:function(){var e,t=this;this._inputList=this._formElement.querySelectorAll(this._config.inputSelector),this._submitButtonElement=this._formElement.querySelector(this._config.submitButtonSelector),(e=this._inputList,function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).forEach((function(e){e.addEventListener("input",(function(){t.toggleButtonState(),t._checkInputValidity(e)}))}))}},{key:"enableValidation",value:function(){this._setEventListener()}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),l=document.querySelector("#popup-image"),c=(l.querySelector(".popup__image-element"),l.querySelector(".popup__image-title"),{formSelector:".popup__form",inputSelector:".popup__text",submitButtonSelector:".popup__submit-btn",inactiveButtonClass:"popup__submit-btn_disabled",inputErrorClass:"popup__error_active"}),a=document.querySelector(".profile"),p=a.querySelector(".profile__edit-btn"),s=a.querySelector(".profile__add-btn"),f=document.querySelector("#popup-profile"),y=f.querySelector(".popup__text_type_name"),m=f.querySelector(".popup__text_type_caption"),v=(a.querySelector(".profile__name"),a.querySelector(".profile__caption"),document.forms.formPopupProfile),b=(document.querySelector("#popup-card").querySelector(".popup__submit-btn"),document.forms.formPopupCard);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==d(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===d(o)?o:String(o)),r)}var o}var _=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){return e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==S(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===S(o)?o:String(o)),r)}var o}var E=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._popupElementBtn=this._popupElement.querySelector(".popup__close-btn"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("click",(function(t){t.target===t.currentTarget&&e.close()})),this._popupElementBtn.addEventListener("click",(function(){return e.close()}))}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==w(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function P(e,t){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},P(e,t)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===w(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t,n=e.popupSelector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._handleFormSubmit=r,t._popupForm=t._popupElement.querySelector(".popup__form"),t._popupInputs=t._popupElement.querySelectorAll(".popup__text"),t.setEventListeners(),t}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._popupInputs.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;j(O(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues()),e.close()}))}},{key:"setInputValues",value:function(e){this._popupInputs.forEach((function(t){t.value=e[t.name]}))}},{key:"close",value:function(){this._popupForm.reset(),this._postCloseHandler&&this._postCloseHandler(),j(O(u.prototype),"close",this).call(this)}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(E);function I(e){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==I(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==I(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===I(o)?o:String(o)),r)}var o}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},L.apply(this,arguments)}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===I(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupImageElement=t._popupElement.querySelector(".popup__image-element"),t._popupTitleElement=t._popupElement.querySelector(".popup__image-title"),t.setEventListeners(),t}return t=u,(n=[{key:"open",value:function(e,t){L(x(u.prototype),"open",this).call(this),this._popupImageElement.src=t,this._popupImageElement.alt=e,this._popupTitleElement.textContent=e}}])&&q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(E);function R(e){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(e)}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==R(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==R(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===R(o)?o:String(o)),r)}var o}var A=new(function(){function e(t){var n=t.nameSelector,r=t.captionSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._caption=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,caption:this._caption.textContent}}},{key:"setUserInfo",value:function(e){var t=e.nameInput,n=e.captionInput;this._name.textContent=t,this._caption.textContent=n}}])&&V(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({nameSelector:".profile__name",captionSelector:".profile__caption"}),F=new B("#popup-image");function U(e,t){return new n({name:e,link:t},"#element-template",(function(){return F.open(e,t)})).createCard()}var D=new _({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].reverse(),renderer:function(e){D.addItem(U(e.name,e.link))}},".elements");D.renderItems();var M=new C({popupSelector:"#popup-profile",handleFormSubmit:function(e){A.setUserInfo({nameInput:e.namePopup,captionInput:e.captionPopup})}}),H=new C({popupSelector:"#popup-card",handleFormSubmit:function(e){D.addItem(U(e.titlePopup,e.linkPopup))}});p.addEventListener("click",(function(){M.open(),y.value=A.getUserInfo().name,m.value=A.getUserInfo().caption})),s.addEventListener("click",(function(){H.open(),z.toggleButtonState()}));var z=new u(c,b);z.enableValidation(),new u(c,v).enableValidation()})();