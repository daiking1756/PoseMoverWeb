let correct_image_list;
const ul = document.getElementsByClassName('list-group')[0];
$.get("/images",
    function(data){
        correct_image_list = data;
        correct_image_list.forEach(image => {
            // imgタグ生成
            const img = document.createElement('img');
            img.src = `/images/${image}`;

            // liタグ生成
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.appendChild(img);

            ul.appendChild(li);
        });
    }
);
