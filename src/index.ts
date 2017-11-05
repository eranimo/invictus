import render from './render';
import './style.scss';
import MapGenerator from './generator';


const manager = new MapGenerator({
  size: 1000,
  seed: 1000,
  sealevel: 130,
});

// render();

manager.init().then(() => {
  console.log('Map generated', manager);

  manager.fetchChunk(new PIXI.Point(0, 0)).then(chunk => {
    console.log('Chunk generated', chunk);

    render(chunk);
  });
});
