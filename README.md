# Blog Web Application Project

## Projenin Amacı
Bu projenin amacı, frontend tarafına server ve application dahil ederek bir web application oluşturmaktır. Bir blog sayfası mantığıyla oluşturulmuş bu web sitesinde yeni blog gönderileri oluşturulabilir istenirse silinebilir veya düzenlenebilir. Eğer gönderilerin detayı görülmek istenirse "view more" linkine tıklayarak ilgili gönderinin geniş içeriğinin bulunduğu sayfaya gidilebilir.

## Proje Detayları 

HTML, CSS, JavaScript ile oluşturulmuştur. Sunucu kısmını çalıştırabilmek için runtime environment olarak node.js'den faydalanılmış Server Application kurabilmek için ise Express.js framework'ü kullanılmıştır. Embeeded JavaScript ile dinamik web sayfaları kurulmuştur.

Express, multer ve ejs npm modülleri indirilip projede kullanılmıştır. 

public dizini içinde projenin statik dosyaları ve klasörleri bulunur. Bunlar stil veren css dosyaları ve sitede kullanılan içerikler için assests klasörü gibi içerikler barındırır. styles klasörü içindeki css dosyaları modüler olabilmesi açısından işlevlerine göre ayrılmıştır. Böylece tekrar edeceği yerler için tek bir dosya ile çözüm bulunmuş düzenleme yapılacağı zaman modülerliği sayesinde işi kolaylaştırmıştır. 
page.js dosyasında sayfa için dom manipülasyonları içerir. 
views klasöründe ise dinamik olarak değiştirilecek html içerikleri bulunur. Ana sayfalar olan index. ejs ve blog.ejs. Bunların ek içerikleri olan html parçaları ise partials klasörü içindedir. Böylece 2 sayfa için tekrar edecek içerikler partials bölümünde toplanarak kodun daha sade olması sağlanmıştır. Ayrıca html parçalarına dinamik olarak veri eklemek için ejs tag'ları kullanıldı.
index.js ise sunucu için kurulan application bölümünü içerir. Bu bölümde kullanılan temel http metodları ile belli istekler alınıp, bir mantıktan geçirilerek cevap oluşturulur. 
Sunucuyu kurabilmek için express.js framework'ünden yararlanılmıştır. 
package.json dosyası projenin konfigürasyon dosyasıdır.

Kodların detaylı çalışma mantığı yorum satırında belirtilmiştir. 

## Projeyi Çalıştırmak İçin

Öncelikle Node.js kurulumu yapılmalı ve terminale proje dizinindeyken npm install komutu yazılıp çalıştırılmalıdır. Bu şekilde projenin içerdiği bağımlılıklar yüklenecek ve node_modules dosyası eklenecektir. Daha sonra node index.js komutu ile sunucu çalıştırılabilir. localhost:3000 adresine bir tarayıcıdan gidildiğinde web uygulamasına erişebilir ve üstünde işlemlerini yapabilirsiniz. Sunucuyu kapatmak için terminale ctrl+c komutunu girmelisiniz.

*Not: Projenin sunucusu 3000 portunda çalışacak şekilde ayarlanmıştır. Eğer 3000 portunda çalışan başka bir sunucu varsa projeyi çalıştıramazsınız. Portun boş olduğundan emin olun.*