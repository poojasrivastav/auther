import React from 'react';

const Home = () => (
  <div className="home">
    <div className="banner text-center text-inverted">
      <h1>A U T H E R</h1>
      <h1><small>a fake application for collaborative authoring</small></h1>
    </div>
    <div className="about">
      <div className="text-inverted">
        <div className="icon-flexbox container">
          <span className="glyphicon glyphicon-eye-open" />
          <span>+</span>
          <span className="glyphicon glyphicon-edit" />
          <span>+</span>
          <span className="glyphicon glyphicon-duplicate" />
          <span>=</span>
          <span className="glyphicon glyphicon-sunglasses" />
        </div>
      </div>
      <div className="inverted">
        <div className="container">
          <div className="media large-font">
            <div className="media-left media-middle">
              <img className="media-object" src="/images/stock-footage-old-typewriter.jpg" />
            </div>
            <div className="media-body">
              <p className="media-heading large-font">Some hipster ipsum</p>
              <span>Fashion axe butcher listicle, viral banh mi +1 Carles Pitchfork actually chia. Polaroid farm-to-table letterpress, fashion axe pour-over banjo ugh American Apparel art party Odd Future Neutra. Ugh YOLO tilde Pinterest McSweeney's umami.</span>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="media large-font">
            <div className="media-body">
              <p className="media-heading large-font">More ipsum!</p>
              <span>Hoodie taxidermy Brooklyn bitters, XOXO forage typewriter single-origin coffee. Slow-carb try-hard hashtag mlkshk narwhal sartorial.</span>
            </div>
            <div className="media-right media-middle">
              <img className="media-object" src="/images/stock-footage-old-man.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
