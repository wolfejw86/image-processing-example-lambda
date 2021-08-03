// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http(req) {
  return {
    statusCode: 200,
    headers: {
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
      "content-type": "text/html; charset=utf8",
    },
    body: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .padding-32 {
      padding: 2rem;
    }
  </style>
</head>
<body class="padding-32">
    <h2>Hello Image Processor</h2>
        <form>
    <input id="i1" type="file" name="file1" multiple>
    <button id="b">
    submit
    </button>
    </form>
    <script src="//code.jquery.com/jquery-1.10.1.min.js"></script>
    <script type="text/javascript">
    $(function () {
      function fileToBase64(file) {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          
          reader.onload = () => resolve(reader.result);
        });
      };
      
      function replaceDataTag(s) {
        return s.replace('data:image/png;base64,', '').trim();
      }
      
      const input = document.querySelector('#i1');
      const b = document.querySelector('#b');
      b.addEventListener('click', async e => {
        e.preventDefault();
        
        const [img1, img2] = await Promise.all([
            fileToBase64(input.files[0]).then(replaceDataTag),
          fileToBase64(input.files[1]).then(replaceDataTag),
        ]);
        
        const json = {
          img1,
          img2
        };
        
        const res = await fetch('/upload', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(json),
        });
        
        const result = await res.json();
        console.log({ result });
        const url = "data:image/tiff;base64," + result.multipageTiff;

        const blob = await fetch(url).then(res => res.blob());

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.innerText = "Download";
        a.setAttribute("download", "img.tiff");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    });
     
    </script>
</body>
</html>
`,
  };
};
