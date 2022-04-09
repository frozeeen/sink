# SINK ⛵
Fish generator for Phishers.

Open console and paste this code to generate `handle`, `password` and static `planet`.
```javascript
sink_now("http://localhost/sink/3vilboat/login.php", {
    "handle": "!EMAIL",
    "password": "!PASSWORD",
    "planet": "earth"
}, {
    "count": 5
});
```

### How to use
1. Go to 3vil site
2. Open your console
3. Paste this code, this will just include the script
```javascript
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://sinkjs.herokuapp.com/app.js';
document.head.appendChild(script);
```

### Credits
- [First and Middle Names from Dominic Tarr](https://github.com/dominictarr/random-name/)
- [Random Words from randomlists](https://www.randomlists.com/)