S2 Fashion — Local Images Folder
=================================

This site currently uses reliable placeholder images from picsum.photos
(referenced directly by URL in js/products.js and in the HTML pages) so
the site works immediately with no missing images.

To switch to your own local product photos:

1. Add your images here, named like:
     product-1.jpg
     product-1-alt.jpg
     product-2.jpg
     ...
     hero.jpg
     category-women.jpg
     category-men.jpg
     etc.

2. Open js/products.js and replace each product's "image" and "imageAlt"
   URL with the matching local path, e.g.:
     image: "images/product-1.jpg",
     imageAlt: "images/product-1-alt.jpg",

3. Open index.html and replace the hero/category <img src="..."> picsum
   URLs with your local images/*.jpg paths.

Recommended image sizes:
- Product photos: 700x900px (portrait, 7:9 ratio)
- Hero banner:     900x1100px
- Category cards:  500x650px

Keep file sizes reasonable (under ~300KB each, ideally as .jpg or .webp)
for fast page loads, since this is a static site with no server-side
image optimization.
