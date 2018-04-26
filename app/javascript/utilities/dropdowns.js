// // Dropdown buttons
//
// window.Utility = window.Utility || {};
//
// Utility.Dropdowns = {
//   js() {
//     $('html.no-js').removeClass('no-js').addClass('js');
//   },
//
//   set() {
//     // Clicking button, or link
//     $('.dropdown-toggle').click((e) => {
//       // Don't follow link's default
//       e.preventDefault();
//       // If this menu is already open
//       if ($(e.target).siblings('.dropdown-menu').hasClass('show')) {
//         // Close this menu
//         $(e.target).next('.dropdown-menu').removeClass('show');
//       } else {
//         // Close other open menu
//         $('.dropdown-menu').removeClass('show');
//         // Open this menu
//         $(e.target).next('.dropdown-menu').addClass('show');
//       }
//     });
//
//     // Clicking anywhere on page
//     $(document).click((e) => {
//       let target = e.target;
//       // If clicked element is *not* the button/link, nor a child of the menu
//       if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
//         // Close any menu
//         $('.dropdown-menu').removeClass('show');
//       }
//     });
//
//   }
// }
//
// $(document).on('turbolinks:load', () => {
//   Utility.Dropdowns.js();
//   Utility.Dropdowns.set();
// });
