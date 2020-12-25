# Drawkit
Library for rendering 2d elements onto an html canvas

## Usage and Instalation

`npm install @spacelys/drawkit --save`

If you are using typescript autocomplete will be your best friend when it comes to understanding what methods to use when drawing rects, circles, sprites, text, etc...

### Drawing a square

```typescript
import * as drawkit from '@spacelys/drawkit'

const ctx = drawkit.CanvasBuilder('#myCanvasId');
ctx.primitive().rect()
    .at(0, 0)
    .size(64, 64)
    .color('rgb(255, 0, 0)')
    .render();
```

---

### Drawing multiple squares

```typescript
const squareStamp = ctx.primitive().rect()
    .size(64, 64)
    .color('rgb(255, 0, 0)');
    
[0, 128, 256, 512].forEach(x => {
    squareStamp
        .at(x, 0)
        .render();
});
```

---

### Drawing sprite

```typescript
import * as drawkit from '@spacelys/drawkit'

const ctx = drawkit.CanvasBuilder('#myCanvasId');
const mySprite = await drawkit.loadImage('./url/to/mySprite.png');

ctx.draw(mySprite)
    .at(200, 200)
    .scaled(2, 2)
    .part(0, 0, 16, 16)
    .render();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
