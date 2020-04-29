// var $exerciseBtn = document.querySelector('#exerciseBtn');
// var $restBtn = document.querySelector('#restBtn');
// var $createWorkout = document.querySelector('#submitBtn')
// var $deleteRow = document.querySelectorAll('.deleteRow');

var addExercise = function(e) {
  console.log(e.target.id);
  // Find Exercise details container
  var $exerciseInput = document.querySelector('#exercises');
  // Clone the 1st child of the element
  var copyField= $exerciseInput.children[0].cloneNode(true);

  // Figure out if the background needs to be changed
  // If childnodes return is odd, should change BG to green
  if (e.target.id === 'exerciseBtn'){ // What to do if the exercise button is
    if ($exerciseInput.children.length % 2 == 0) {
    }else{
      copyField.classList.remove('alert-primary');
      copyField.classList.add('alert-success');
    }
  } else if (e.target.id === 'restBtn') { // What to do if the rest button is clicked
    copyField.classList.remove('alert-primary');
    copyField.classList.add('alert-warning');
  }

  // Add new child to list
  $exerciseInput.appendChild(copyField);
};

var removeExercise = function () {
  console.log('clicked!!!');
}

//Take in dictionary from form and put out easily readable dictionary by exezrcise
function cleanFormData(d) {
  var w = {};
  var e = [];

  // break down exercises
  for (let i = 0; i < d.length -1 ; i+=2) {
    let dict = {
      exercise : d[i].value,
      time: Number(d[i+1].value)
    }

    // add exercises to dict
    e.push(dict)
  }

  // add exercises to dictionary
  w.exercises = e;
  // add reps to dictionary
  w.reps = d[d.length-1].value;

  return w;
}


// Add event listeners
$exerciseBtn.addEventListener('click', addExercise);
$restBtn.addEventListener('click', addExercise);
// $deleteRow.addEventListener('click', removeExercise);
// $createWorkout.addEventListener('click', workout);
