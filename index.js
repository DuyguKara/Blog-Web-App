import express from "express";
import {dirname} from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

//Sunucu initialize ediiyor express frameworkü ile.
const app = express();

/* form verilerinden dosya alabilmek için multer npm package kullandım.
indirip import ettikten sonra gelecek dosyaları kaydedilecek hedef path oluşturdum. */
const upload = multer({ dest: 'public/uploads/' });

//kullanıcın gönderdiği post datalarını tutmak için array.
let posts = [];

//public dosyasının içindekilerin statik dosyalar olduğunu anlaması için bu ara yazılımı koydum.
//böylece stil dosyaları vb ekleniyor.
app.use(express.static("public"));

//verilerin json formatına ayrıştırılması için arayazılım.
app.use(bodyParser.urlencoded({ extended: true }));

/* 
render almayacak olsaydık bir html sayfasını böyle respond ile gönderirdik.
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/html/home.html")
}); */

//anasayfaya get isteği yapıldığında bu route'a gelecek request.
app.get("/", (req, res) => {
    /* posts arrayimi posts adıyla index.ejs sayfasına yolluyorum ve bu sayfayı respond olarak döndürüyorum. */
    res.render("index.ejs", { posts: posts });
});


/* hedef path ayarlandıktan sonra formda dosyanın name özelliğine hangi değeri verdiysem  upload.single('image') ona göre bunu koydum.
name = 'image' idi.
daha sonra "req.file" diyerek dosyayla alakalı alabildiğim özellikleri görebiliyorum ayrıca belirttiğim dizine dosyayı kaydediyor.

img: req.file.filename,
ile dosyann adını img keyime koydum.

formdan dosya alıp server'a gönderebilmek için <form action="/" method="post" class="form-example" onsubmit="return validateForm()" enctype= "multipart/form-data">
encytpe özelliğini koyman gerek.*/


// post methoduyla / endpointine istek geldiğinde burası çalışacak.
app.post("/", upload.single('image'), (req, res)=>{
    console.log(req.body);
    console.log(req.file);

    //postData objesinde dinamik olarak göndermek istediğim verileri tutuyorum.
    //bodyparser ile ayrıştırılmış verileri alabiliyorum. örneğin req.body["postName"] gibi.
    const postData = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, // Son postun ID'sini al ve bir arttır.
        name: req.body["postName"],
        img: req.file.filename,
        sum: req.body["summary"],
        content: req.body["content"]
    }
    //posts arrayine bu objeyi ekliyorum.
    posts.push(postData);
    console.log("posts: " + posts.length);
    console.log(postData.id);

   /* post methodunda redirect kullanarak anasayfaya yolladım çünkü tarayıcı en son post metodu yapıldığında 
   onu hatırlıyor ve göstermesi gereken sayfadayken yenile yaparsam post metodunu tekrar çağırıyor kullanıcının son eklediği
   post tekrar oluşturuluyor bu yüzden. double submission oluyor yani. redirect ile anasayfaya yolladığımda post metodunu tekrarlamıyor. */
    res.redirect("/");

});

/* page.js tarafında delete methoduna /posts/0 gibi bir istek yollandığında burası çalışıyor. */
app.delete("/posts/:id", (req, res)=>{
    /* req.params, Express.js içinde URL'ye dahil olan dinamik parametreleri tutan bir nesnedir. Örneğin, bir rota tanımlarken, 
    URL'ye belirli değerler yerleştirildiğinde bu değerler req.params içinde erişilebilir hale gelir.  */
    const dataId = parseInt(req.params.id , 10);
    // console.log(dataId); 0, 1 gibi postun id değeri geliyor olarak.
    //req.params.id string olarak geldiği için onu 10luk tabanda integer yaptım parseint ile.


    /* eğer posts dizisi içinde postOnject ile dolaşırken dataId eşit bir id değeri bulursam 204 status kod gönderiyorum ve o objeyi filtreleyip geri kalan objeleri diziye ekliyorum. */
    if(posts.find((postObject) => postObject.id === dataId)){
        res.sendStatus(204);
        posts = posts.filter((postObject) => postObject.id !== dataId); // filter ile dizideki id özelliğiyle dataid eşit olmayanları alıyorum eşit olan yani silinecek obje verileri hariç tekrar diziye kaydediyorum. 
    }else {

        /* id eşit bir obje bulamazsa 404 kodunu yolluyorum. */
        res.sendStatus(404);
    }

});

app.use(bodyParser.json());


/* dizi içinde id eşleşen objeyi buluyorum bu obje varsa eğer 204 kodunu gönderiyorum ve eski değerlere yeni girdileri atıyorum. */
app.put("/posts/:id", upload.single('image'), (req, res) =>{
    const dataId = parseInt(req.params.id , 10);
    var postData = posts.find((postObject) => postObject.id === dataId);
    console.log("Değiştirilecek içeriğin Başlığı: " + postData.name);
    console.log("Yeni içeriğin başlığı: " + req.body.postName);

    if(postData){
        res.sendStatus(204);
        postData.name = req.body.postName;
        postData.img = req.file.filename;
        postData.sum = req.body.summary;
        postData.content = req.body.content;
    }else {
        res.sendStatus(404);
    }
});  

/* id ile eşleşen objeyi buluyorum. eğer varsa blog.ejs render ediyorum. */
app.get("/blog/:id", (req, res) => {
    const postId = parseInt(req.params.id , 10);
    console.log(typeof(postId)); //req.params.id string geliyor
    console.log("PostId: " + postId);
    console.log("Posts:", posts); 
    const post = posts.find(p => p.id === postId);
    console.log(typeof(post));

    if (post) {
        console.log("Post Name:", post.name);
        res.render("blog.ejs", { post: post });
    } else {
        console.log("Post bulunamadı.");
        res.status(404).send("Post not found.");
    }
});

/* delete ve put metodları status kodlarını page.jsde bulunan fetch kısmına yolluyor. */

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}.`)
});