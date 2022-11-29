
import React, {useEffect, useState} from 'react';
import BirthdayDropdown from './components/BirthdayDropdown.jsx';
import PositionRadio from './components/PositionRadio.jsx';
import CountryPicker from './components/CountryPicker.jsx';
import companyLogo from './images/uxlogo.png'
import './App.css';
import styles from './styles/pages/App.module.css';
import ReactTooltip from 'react-tooltip';


function App() {
  const [nameForm, setNameForm] = useState("");
  const [ageForm, setAgeForm] = useState(undefined);
  const [colorList, setColorList] = useState([undefined, undefined, undefined]);
  const [confirmColorList, setConfirmColorList] = useState([undefined, undefined, undefined]);
  const [positionForm, setPositionForm] = useState([undefined, undefined, undefined]);
  const [coverLetterForm, setCoverLetterForm] = useState("");
  const [countryForm, setCountryForm] = useState(null);

  const [birthdayForm, setBirthdayForm] = useState(undefined);

  const [errors, setErrors] = useState({ 
    ageMismatch: false,
    passwordMismatch: false,
    coverLetterLength: false,
    roleNotHiring: false,
    filledOutForm: false,
  })

  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const updateColor = index => e => {
    let newArr = [...colorList]; 
    newArr[index] = e.target.value; 

    setColorList(newArr);
  }

  const updateConfirmColor = index => e => {
    let newArr = [...confirmColorList]; 
    newArr[index] = e.target.value; 

    setConfirmColorList(newArr);
  }

  const submitForm = () => {
    setErrors(e => ({ ...e, filledOutForm: true }))

    if (!nameForm || !ageForm || !colorList[0] || !colorList[1] || !colorList[2]) {
      console.log('1');
      return;
    }

    if (!confirmColorList[0] || !confirmColorList[1] || !confirmColorList[2]) {
      console.log('2');
      return;
    }

    if (!positionForm[0] || !positionForm[1] || !positionForm[2]) {
      console.log('3');
      return;
    }

    if (!coverLetterForm || !countryForm || !birthdayForm) {
      console.log('4');
      return;
    }

    if(errors.ageMisMatch === true || 
      errors.passwordMismatch === true ||
      errors.coverLetterLength === true ||
      errors.roleNotHiring === true) {
        console.log('5');
        return;
    }

    console.log('6');
    setErrors(e => ({ ...e, filledOutForm: false }))
    setSuccessfulSubmit(true);
  }


  const resetAll = () => {
    setNameForm("");
    setAgeForm('');
    setColorList(['', '', '']);
    setConfirmColorList(['', '', '']);
    setPositionForm([null, null, null]);
    setCoverLetterForm("");
    setCountryForm(null);
    setBirthdayForm(undefined)
    setErrors({ 
      ageMismatch: false,
      passwordMismatch: false,
      coverLetterLength: false,
      roleNotHiring: false,
    })
  }

  // birthdate/age validator
  useEffect(() => {
    if (!birthdayForm || !ageForm) {
      return;
    }

    const today = new Date();
    const birthdayAge = today.getFullYear() - birthdayForm[0];

    if (parseInt(birthdayAge) === parseInt(ageForm)) {
      setErrors(e => ({ ...e, ageMismatch: false }))
    } else {
      setErrors(e => ({ ...e, ageMismatch: true }))
    }

  }, [birthdayForm, ageForm])

  // password validator
  useEffect(() => {
    // make sure user put in all colors before
    if (!colorList[0] || !colorList[1] || !colorList[2]) {
      return;
    }

    if (!confirmColorList[0] || !confirmColorList[1] || !confirmColorList[2]) {
      return;
    }

    if (colorList[0] === confirmColorList[0]) {
      if (colorList[1] === confirmColorList[1]) {
        if (colorList[2] === confirmColorList[2]) {
          setErrors(e => ({ ...e, passwordMismatch: false }))
          return;
        }
      }
    }

    setErrors(e => ({ ...e, passwordMismatch: true }))
  }, [colorList, confirmColorList])


  // job position validators
  useEffect(() => {
    if (!positionForm[0] || !positionForm[1] || !positionForm[2]) {
      return;
    }


    if (positionForm[0] === "Intern") {
      setErrors(e => ({ ...e, roleNotHiring: true }))
    } else if (positionForm[1] === "Marketing") {
      setErrors(e => ({ ...e, roleNotHiring: true }))
    } else if (positionForm[2] === "Designer" || positionForm[2] === "Manager") {
      setErrors(e => ({ ...e, roleNotHiring: true }))
    } else {
      setErrors(e => ({ ...e, roleNotHiring: false }))
    }

  }, [positionForm])


  useEffect(() => {
    if (coverLetterForm.length === 0) {
      return;
    }

    if (coverLetterForm.length >= 300) {
      setErrors(e => ({ ...e, coverLetterLength: false }))
    } else {
      setErrors(e => ({ ...e, coverLetterLength: true }))
    }

  }, [coverLetterForm])

  return (
    <div className={styles.background}>
      <ReactTooltip multiline={true} />
      <main className={styles.mainContainer}>
      <img src={companyLogo} className={styles.companyLogo} alt="Logo" />
      <h1>The UI/UX Company</h1>
      {successfulSubmit 
      ? <span>Thank you for your application! Your application has likely been received
      by the company. We promise a turnover time of 3-6 months. Do check your UI/UX Company
      Job Account frequently for updates!
      </span>
      : <>
      <span>Thank you for your interest in applying for a job at our company! 
      Please fill out our job application form.</span>


      <label style={{ "margin-top": "2em" }}>
        Name:
        <input type="text" value={nameForm} onChange={e => setNameForm(e.target.value)} />
      </label>

      <label>
        Age:
        <input type="number" value={ageForm} onChange={e => setAgeForm(e.target.value)} />
      </label>

      { errors.ageMismatch && <span className={styles.error}>Age and birthday does not match!</span>}
      
      <label>
        Select the position you are applying for:
        <PositionRadio value={positionForm} onChange={setPositionForm} />
      </label>

      <label>
        Country: 
        <CountryPicker onChange={e => setCountryForm(e)} value={countryForm} />
      </label>

      { errors.roleNotHiring && <span className={styles.error}>{`We are currently not hiring ${positionForm[0]} ${positionForm[1]} ${positionForm[2]}s. Please apply for another role.`}</span>}

      <label className={styles.flex} >
        <span>
          Password:
        </span>
        <input type="color" value={colorList[0]} onChange={updateColor(0)} />
        <input type="color" value={colorList[1]} onChange={updateColor(1)} />
        <input type="color" value={colorList[2]} onChange={updateColor(2)} />

        <div 
          data-tip="Create a password for your UI/UX Company Job Application account. <br> Using our innovative ColorPass™ password solutions."
          className={styles.tooltip}
        >
          ?
        </div>
      </label>

      
      <label>
        Confirm Password:
        <input type="color" value={confirmColorList[0]} onChange={updateConfirmColor(0)} />
        <input type="color" value={confirmColorList[1]} onChange={updateConfirmColor(1)} />
        <input type="color" value={confirmColorList[2]} onChange={updateConfirmColor(2)} />
      </label>
      
      { errors.passwordMismatch && <span className={styles.error}>Passwords do not match!</span>}

      <label>
        Upload your resume:
        Allowed filetypes: jpg/png/svg
        <input type="file" accept=".jpg,.png,.svg"/>
      </label>

      
      <label className={styles.coverLetter}>
        <div style={{ "margin-bottom": "1em" }}>
          Please write a cover letter on this prompt: "Why do you want to work for our company? <br/> Please provide justifications other than financial compensation. Minimum 300 characters. The form is encrypted for your safety.
        </div>
        
        <input type="password" size={10} value={coverLetterForm} onChange={e => setCoverLetterForm(e.target.value)} />
      </label>

      { errors.coverLetterLength && <span className={styles.error}>{`Please write at least 300 characters. Character count: ${coverLetterForm.length} `}</span>}

      <label>
        Birthday: 
        <BirthdayDropdown value={birthdayForm} onChange={setBirthdayForm}/>
      </label>


      <div className={styles.buttonContainer}>
        <button onClick={resetAll} className={styles.resetButton}>
          Reset
        </button>
        <button onClick={submitForm} className={styles.submitButton}>
          Continue
        </button>
      </div>

      { errors.filledOutForm && <span className={styles.error}>{`Please complete every step of the application before submitting.`}</span>}
      
      </>
      }
      </main>
    </div>
  );
}

export default App;
