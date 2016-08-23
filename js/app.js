var Article = React.createClass({

// START
getInitialState: function(){
  return {  counter: 1, count: 88, data: {}};
},
componentDidMount: function() {
  var self = this;
  var url = 'http://swapi.co/api/people/' + this.state.counter+ '/';
  console.log('url  : ', url);
  var arrFilms = [];
  $.ajax({
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data) {
      $.each( data.films, function( keys, value ) {
        var urlFilms = value
        $.ajax({
          url: urlFilms,
          dataType: 'json',
          cache: false,
          success: function(dataFilm) {
            arrFilms.push(
              'Episode ' + dataFilm['episode_id'] + ': ' + dataFilm['title']
              );
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(ajaxUrl, status, err.toString());
          }.bind(this)
        });
      })
      console.log('arrFilms  : ', arrFilms)
    /*for (var i = 0; i < arrFilms.length; i++) {
        data.films[i] = arrFilms[i];
      }*/
      console.log(data)
      self.setState({
        data: data
      })
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(ajaxUrl, status, err.toString());
    }.bind(this)
  });
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
  var dataCounter;
  var dataJson = this.state.data;
  var arr =[];
  var arrFilmsRender =[];

  arr.push (

    )
  console.log(dataJson)

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