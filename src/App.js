import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [form, setForm] = useState({});
  const [res, setRes] = useState([]);
  // let arr = [];

  const onEnterValue = ({name, value}, type) => {
    console.log('step 1 ', {name, value})
    if(type !== 'arr') {
      setForm({...form, [name]: value})
    } else {
      res.push(name)
      setRes(res)
      setForm({...form, ['options']: res})
    }
    // arr.push(form);
    // setRes(arr);
  }

  const formschema = [
    {
      title: "Registration Form",
      inputs: [
        {
          inputType: 'text',
            name: "sentenceInputA",
            prompt: "Sentence of phrase to prompt input",
            options: [],
        },
        {
          inputType: 'text',
            name: "sentenceInputB",
            prompt: "Sentence of phrase to prompt input",
            options: []
        },
        {
          inputType: 'checkbox',
          name: "selectInput",
          prompt: "Select prompt input",
          options: ['red', 'blue', 'yellow']
        },
      ],
      submitAction: (e) => {e.preventDefault(); console.log(form);}
    }
  ]
  return (
    <div className="App">
      {
        formschema.map((form, idx) => (
          <form key={idx} onSubmit={form.submitAction}>
            <h2>{form.title}</h2>
            <hr/>
            {
              form.inputs.map((input, id) => {
                if(input.inputType !== 'checkbox' && input.inputType !== 'radio') {
                  return (
                    <div key={id}>
                      <h5>{input.prompt}</h5>
                      <input 
                        name={input.name} 
                        type={input.inputType}
                        onChange={(e) => {
                          const value = e.target.value;
                          onEnterValue({name: `${input.name}`, value}, 'obj')
                        }} 
                      />
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <h5>{input.prompt}</h5>
                      {
                        input.options.map((selector, index) => {
                          return (
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                              <input 
                                key={index} 
                                name={selector} 
                                type={input.inputType}
                                onClick={(e) => {
                                  const value = true;
                                  onEnterValue({name: `${selector}`, value}, 'arr') 
                                }} 
                              />
                              <p>{selector}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
              })
            }

            <button type='submit'>
              submit
            </button>
          </form>
        ))
      }
    </div>
  );
}

export default App;
