$(".add-flex").click(function(){
    $(".modal").css("display", "block");
    $("input").focus(); // modal içinde bulunan input boxlar başta display none olduğu için servera girilen veriler gelmiyordu. Focuslamak için bunu koydum.
});

$(".close").click(function(){
    $(".modal").css("display", "none");
    $(".edit-modal").css("display", "none");
});


/* input olarak girilen girdileri alıp değişkene atıyorum. Eğer bu değişkenlerden en az biri boşsa alert ile uyarı veriyorum
ve false döndürüyorum. hepsi doldurulduysa ve create butonuna basıldıysa modalı görünmez yapıyorum ve true döndürüyorum.
daha sonra form tagına onsubmit özelliğini ekleyerek fonku çağırıyorum.
<form action="/" method="post" class="form-example" onsubmit="return validateForm()"

return true olmadıkça server'a girdileri göndermeyecek.
*/
function validateForm(){
    let head = document.getElementById('head').value;
    let headImg = document.getElementById('head-img').value;
    let headSum = document.getElementById('head-sum').value;
    let headContent = document.getElementById('head-content').value;

    if(head === "" || headImg === "" || headSum === "" || headContent === ""){
        alert("Please enter all inputs!");
        return false;
    }else {
        $(".create-button").click(function(){
            $(".modal").css("display", "none");
        });

        return true;
    }
}


/* tıklanan elementin dataid özelliğini alıyorum ve bunu /posts/0 gibi delete metoduna yolluyorum. eğer sunucudan 204 kodu cevap gelirse postu domdan kaldırıyorum
aksi durumda konsola log alıyorum. */
$(document).on('click', '#delete-post', function() {
    const dataId = $(this).data('id'); 
        console.log("Deleting post with ID: " + dataId);

    fetch(`/posts/${dataId}`, {
        method: 'DELETE'
    })
    .then((response) => {
        if (response.status === 204) {
            console.log("Post Deleted");
            $(this).closest('.item').remove(); // Postu DOM'dan kaldır
        } else {
            console.log("Post could not be deleted.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});


/* tıklanan elementin dataid özelliğini alıyorum. */
$(document).on('click', '#edit-post', function() {
    $(".edit-modal").css("display", "block");
    $("input").focus();
    const dataId = $(this).attr('data-id');
    console.log(dataId);

    /* save butonuna tıklandığında kullanıcının girdilerini alıyorum. */
    $('.save-button').off('click').on('click', function(event) {
        // Form elemanlarını al
        const postName = document.getElementById('head-edit').value;
        const image = document.getElementById('head-img-edit').files[0];
        const summary = document.getElementById('head-sum-edit').value;
        const content = document.getElementById('head-content-edit').value;

        // Boş alan kontrolü
        if (!postName || !image || !summary || !content) {
            alert("Lütfen tüm alanları doldurun.");
            return; // Eğer boşsa gönderimi durdur
        }else {
            // FormData nesnesi oluştur
        const formData = new FormData();
        formData.append('postName', postName);
        formData.append('image', image);
        formData.append('summary', summary);
        formData.append('content', content);

        console.log(formData);

        /* formdata nesnesi oluşturup aldığım özellikleri ekledikten sonra posts/0 gibi uzantılı put metodunun body'sine bu datayı yolluyorum.
        eğer sunucudan 204 cevabı alırsa post değişmiştir aksi durumda bir sorun olmuştur. */
        fetch(`posts/${dataId}`, {
            method: 'PUT',
            body: formData // FormData nesnesini gönder
        })
        .then((response) => {
            if (response.status === 204) {
                console.log("Post Changed");
            } else {
                console.log("Post could not be deleted.");
            }
        })
        .catch((error) => {
            console.error(error);
        });

        }
    });
});