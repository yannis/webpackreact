// import Sortable from 'sortablejs/Sortable.min.js';

// let sortSortables = () => {
//   $('.sortable').each((index, ul) => {
//     Sortable.create(ul, {
//       onSort: function (event) {
//         let url = $(ul).data('sortable-url');
//         let ids = $(event.from.children).map((index, li) => {
//           return li.dataset.id;
//         });
//         $.ajax({
//           url: url,
//           type: 'post',
//           data: {
//             ids: ids.toArray()
//           },
//           error(data){
//             alert(data);
//           }
//         })
//       },
//     });
//   })
// }

// $(document).on('turbolinks:load', function(){
//   sortSortables();
// })
