var Article = React.createClass({

// START
getInitialState: function(){
  return {  counter: 1, count: 88};
},
clickNext: function(){
  if (this.state.counter != this.state.count) {
    this.setState({ counter: this.state.counter + 1 }); 
    console.log(this.state.counter);
  }
},
clickPrev: function(){
  if (this.state.counter != 1) {
    this.setState({ counter: this.state.counter - 1 }); 
    console.log(this.state.counter);
  }
},
render: function () {
  var self = this;
  var xhr, dataJson, dataCounter, ajaxUrl, arrFilms;
  arrFilms = [];
  var XHR =  XDomainRequest;

  var xhr = new XHR();
  ajaxUrl = 'http://swapi.co/api/people/' + this.state.counter+ '/';
  console.log(this.state.url);
  xhr.open('GET', ajaxUrl, false);
  xhr.send();
  if (xhr.status == 404) {
    console.log(xhr.status + ': ' + xhr.statusText); 
  }
  var counterFilms = 1;
  dataJson = JSON.parse(xhr.responseText)
  for (var keys in dataJson.films) {
    var ajaxFilms = new XMLHttpRequest();
    var ajaxFilmsUrl = dataJson.films[counterFilms-1];
    ajaxFilms.open('GET', ajaxFilmsUrl, false);
    ajaxFilms.send();
    var newJson = JSON.parse(ajaxFilms.responseText);
    arrFilms.push(
      'Episode ' + newJson['episode_id'] + ': ' + newJson['title']
      );
    counterFilms++
  }
  arrFilms.sort();
  for (var i = 0; i < arrFilms.length; i++) {
    dataJson.films[i] = arrFilms[i];
  }
  console.log(arrFilms); 
  console.log(dataJson); 
  var arr =[];
  var arrFilmsRender =[];

  arr.push (
    <div key={1}>
    <div className="left">
    <p><strong>Name:</strong> {dataJson.name}</p>
    <p><strong>Height:</strong> {dataJson.height}</p>
    <p><strong>Mass:</strong> {dataJson.mass}</p>
    <p><strong>Hair color:</strong> {dataJson.hair_color}</p>
    <p><strong>Skin color:</strong> {dataJson.skin_color}</p>
    <p><strong>Eye color:</strong> {dataJson.eye_color}</p>
    <p><strong>Birth year:</strong> {dataJson.birth_year}</p>
    <p><strong>Gender:</strong> {dataJson.gender}</p>
    </div>
    </div>
    )
  dataJson.films.map(function(v,i) {
    var a = v.substring(0, 9);
    var b = v.substring(9);
    arrFilmsRender.push(
      <div key={i+1}>
      <div className="left">
      <p><strong>{a}</strong>{b}</p>
      </div>
      </div>
      )
  })
  return (
    <div className="post">
    <div id="wrap">
    <div className="data-rows">
    <img src="../img/img.png" alt="image" width="150px" height="150px"/>
    <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
    <button type="button" className={'btn btn-default ' + (this.state.counter == 1 ? 'disabled' : '')} onClick={this.clickPrev}>Prev</button>
    <button type="button" className={'btn btn-default ' + (this.state.counter == this.state.count ? 'disabled' : '')} onClick={this.clickNext}>Next</button>
    </div>
    </div>
    <div className="data-rows">
    {arr}
    </div>
    <div className="data-rows">
    {arrFilmsRender}
    </div>
    </div>
    </div>
    );
  console.log(arr)
}
});
var App = React.createClass({
  render: function () {
    return (
      <div className = 'app'>
      <Article />
      </div>
      );
    }
  });

  ReactDOM.render(
  <App />,
  document.getElementById('root')
  )
  ;
  // 1. Создаём новый объект XMLHttpRequest
