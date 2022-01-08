import React, {useEffect, useState} from 'react';
import {Step2} from './css'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Country from './country'

// overflows style
const MyTextField = styled(OutlinedInput)({
  
  '&:hover': {
    borderColor: 'rgba(171, 171, 171, 0.4)',
  },
  '& fieldset': {
    borderColor: 'rgba(171, 171, 171, 0.21)',
  },
  '&.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(232,65,24, 0.3) !important',
    },
  },
  '& fieldset.MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(171, 171, 171, 0.3) !important',
  },
});
// base color
const orange = "#E84118";

 // expertise sets
const expertise = [
  {
    checked: true,
    name: "Art",
    value: "Art",
    disabled: false
  },
  {
    checked: true,
    name: "Community",
    value: "Community",
    disabled: false
  },
  {
    checked: true,
    name: "Copywriting",
    value: "Copywriting",
    disabled: false
  },
  {
    checked: true,
    name: "Design",
    value: "Design",
    disabled: false
  },
  {
    checked: true,
    name: "Game",
    value: "Game",
    disabled: false
  },
  {
    checked: false,
    name: "Crazy about Bit country",
    value: "Crazy about Bit country",
    disabled: false
  },
  {
    checked: false,
    name: "Leadership",
    value: "Leadership",
    disabled: false
  },
  {
    checked: false,
    name: "Marketing",
    value: "Marketing",
    disabled: false
  },
  {
    checked: false,
    name: "Technical",
    value: "Technical",
    disabled: false
  },
  {
    checked: false,
    name: "Translation",
    value: "Translation",
    disabled: false
  }
];

const channels = [
  {
    checked: true,
    name: "Referred by a friend",
    value: "1",
    disabled: true
  },
  {
    checked: true,
    name: "Twitter",
    value: "2",
    disabled: true
  },
  {
    checked: true,
    name: "Telegram",
    value: "3",
    disabled: true
  },
]

// Validation rules
const rules = {
  referralEmail: {
    name: "referralEmail",
    value: "12313eee13123",
    required: false,
    error: false,
    message: ""
  },
  firstname: {
    name: "firstname",
    value: "",
    required: true,
    error: false,
    message: ""
  },
  lastname: {
    name: "lastname",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  email: {
    name: "email",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  city: {
    name: "city",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  state: {
    name: "state",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  country: {
    name: "country",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  community: {
    name: "community",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  twitter: {
    name: "twitter",
    value: "",
    required: true,
    error: false,
    message: ""
  },
  linkedin: {
    name: "linkedin",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  expertise: {
    name: "expertise",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  briefly: {
    name: "briefly",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  channel: {
    name: "channel",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  otherchannel: {
    name: "otherchannel",
    value: "",
    required: false,
    error: false,
    message: ""
  }
};

class Step2Component extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      formData: {...rules}
    }
  }


  handleChange = (prop) => (event) => {
    if(prop == "expertise" || prop == "channel"){
      this.state.formData[prop].value = event.target.defaultValue
    }else{
      this.state.formData[prop].value = event.target.value
    }

    this.setState({formData: {...this.state.formData}})
  }

  renderCheckboxCom = (list, itemname, value) => {
    return (
      <>
          {
           list.map((item,i)=>{
            return <FormControlLabel  key={i} 
                value = {item.value}
                label={item.name} 
                control={
                  <Radio 
                    sx={{
                        color: orange,
                      '&.Mui-checked': {
                        color: orange,
                      },
                    }}
                  />} 
              />
          })
        }
        </> 
    )
  }

  render(){
    return (
      <Step2>
        <div className="cheader">
          <span className="back" onClick={this.props.preStep}></span><h1>Apply Dmail Ambassador Program</h1>
        </div>
        <div className="form">
          <div className="formGroupWrap">
            <div className="gheader">
              <h2 onClick={this.test}>Referral Email (Optional)-The email address that invited you here</h2>
            </div>
            <div className="gcontent">
                <span className="orangeBlock"></span>
                <MyTextField id="referralEmail" 
                    className="input" 
                    variant="outlined"
                    placeholder="Not required, please enter the name of the referrer" 
                    onChange={this.handleChange('referralEmail')}
                    value={this.state.formData.referralEmail.value}
                  />
                <p className="tip">If you have a strong referring person, you have a high chance to be selected. This field is optional. </p>
            </div>
          </div>
          <div className="multiColumn mt24">
            <div className="formGroupWrap contactInfo">
              <div className="gheader">
                <h2>Contact information*</h2>
              </div>
              <div className="gcontent">
                  <span className="orangeBlock"></span>
                  <div className="label">Your Name</div>
                  <div className="multiColumn">
                      <FormControl variant="standard"  className="mr20">
                        <MyTextField id="firstname" 
                          className="input" 
                          placeholder="First" 
                          variant="outlined" 
                          onChange={this.handleChange('firstname')}
                        />
                      </FormControl>
                      <FormControl variant="standard"> 
                        <MyTextField id="lastname" 
                          className="input" 
                          placeholder="Last" 
                          variant="outlined"
                          onChange={this.handleChange('lastname')}
                        />
                      </FormControl>
                  </div>
                  <div className="label mt9">Your E-mail</div>
                  <div >
                    <FormControl variant="standard">
                      <MyTextField id="email" 
                        className="input" 
                        placeholder="" 
                        variant="outlined" 
                        onChange={this.handleChange('email')}
                      />
                    </FormControl>
                  </div>
                  <div className="label mt9">Your Location</div>
                  <div className="multiColumn">
                    <FormControl variant="standard"  className="mr20">
                      <MyTextField id="city" 
                        className="input" 
                        placeholder="City" 
                        variant="outlined" 
                        onChange={this.handleChange('city')}
                      />
                    </FormControl>
                    <FormControl variant="standard"> 
                      <MyTextField id="outlined-basic" 
                        className="input" 
                        placeholder="Last" 
                        variant="outlined"
                        onChange={this.handleChange('state')}
                      />
                    </FormControl>
                  </div>
                  <FormControl sx={{ m: 1, width: 300 }} className="mt24">
                    <InputLabel id="country">Name</InputLabel>
                    <Select
                      labelId="country"
                      id="country"
                      // multiple
                      value={this.state.formData.country.value}
                      // onChange={handleChange}
                      onChange={this.handleChange('country')}
                      input={<OutlinedInput label="Name" />}
                      // MenuProps={MenuProps}
                    >
                      {Country.map((item,i) => (
                        <MenuItem
                          key={item[0]}
                          value={item[0]}
                          // style={getStyles(name, personName, theme)}
                        >
                          {item[1]}
                        </MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </div>
            </div>

            <div className="formGroupWrap socialMedia">
              <div className="gheader">
                <h2>Your social media</h2>
              </div>
              <div className="gcontent">
                  <span className="orangeBlock"></span>

                  <div className="label mt9">What is the size of the community you can reach directly*</div>
                  <div >
                    <FormControl variant="standard">
                      <MyTextField id="community" 
                        className="input" 
                        placeholder="" 
                        variant="outlined"
                        onChange={this.handleChange('community')}
                      />
                    </FormControl>
                  </div>
                  <div className="label mt9">Your Twitter URL*</div>
                  <div >
                    <FormControl variant="standard">
                      <MyTextField id="twitter" 
                        className="input" 
                        placeholder="Your Twitter URL" 
                        variant="outlined" 
                        onChange={this.handleChange('twitter')}
                      />
                    </FormControl>
                  </div>
                  <div className="label mt9">Your Linkedin URL</div>
                  <div >
                    <FormControl variant="standard">
                      <MyTextField id="linkedin" 
                        className="input" 
                        placeholder="Not required，Your Linkedin URL" 
                        variant="outlined" 
                        onChange={this.handleChange('linkedin')}
                      />
                    </FormControl>
                  </div>
              </div>
            </div>
          </div>

          <div className="formGroupWrap mt24">
            <div className="gheader">
              <h2>Your area of expertise</h2>
            </div>
            <div className="gcontent">
              <div className="checkboxWrap expertise">
                <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="controlled-radio-buttons-group"
                      value={this.state.formData.expertise.value}
                      onChange={this.handleChange("expertise")}
                    >
                      {this.renderCheckboxCom(expertise)}
                    </RadioGroup>
                </FormControl>
                <p className="tip mt24">Select a choice</p>
              </div>
            </div>
          </div>

          <div className="formGroupWrap mt24">
            <div className="gheader">
              <h2>Please briefly tell us about yourself*</h2>
            </div>
            <div className="gcontent">
                <span className="orangeBlock"></span>
                  <textarea
                    placeholder="You can share your relavant experience and resources"
                    className="input userBriefly"
                    id="briefly"
                    onChange={this.handleChange('briefly')}
                  ></textarea>
            </div>
          </div>

          <div className="formGroupWrap mt24">
            <div className="gheader">
              <h2>How did you hear about Dmail*</h2>
            </div>
            <div className="gcontent">
              <div className="checkboxWrap channels">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="controlled-radio-buttons-group"
                  value={this.state.formData.channel.value}
                  onChange={this.handleChange('channel')}
                >
                {this.renderCheckboxCom(channels)}
                  <div className="otherChannel">
                    <FormControlLabel value="other" 
                      control={<Radio sx={{
                          color: orange,
                        '&.Mui-checked': {
                          color: orange,
                        },
                      }}/>} label="Other" />
                    <div>
                      <FormControl variant="standard">
                          <MyTextField 
                            id="otherchannel" 
                            className="input" 
                            placeholder="Fill in your own" 
                            variant="outlined" 
                            onChange={this.handleChange('otherchannel')}
                          />
                      </FormControl>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              </div>
            </div>
          </div>
          <div className="formGroupWrap mt35">
            <Button variant="contained" className="btn submit" onClick={this.props.nextStep}>
              submit
            </Button>
            <Button variant="outlined" className="btn back" onClick={this.props.preStep}>
              back
            </Button>
          </div>
          

        
        </div>
      </Step2>
    );
  }
}
export default Step2Component