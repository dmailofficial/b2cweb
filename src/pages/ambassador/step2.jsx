import React from 'react';
import {Step2} from './css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Country from './country'
import {submit} from './utils'

// main color
const orange = "#FF6633";

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
    name: "Crazy about Dmail",
    value: "Crazy about Dmail",
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
    value: "Referred by a friend",
    disabled: true
  },
  {
    checked: true,
    name: "Twitter",
    value: "Twitter",
    disabled: true
  },
  {
    checked: true,
    name: "Telegram",
    value: "Telegram",
    disabled: true
  },
]

// Validation rules
const rules = {
  referralEmail: {
    name: "referralEmail",
    value: "",
    required: false,
    error: false,
    message: ""
  },
  firstname: {
    name: "firstname",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  lastname: {
    name: "lastname",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  email: {
    name: "email",
    value: "",
    reg: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,6})$/,
    required: true,
    error: false,
    regerror: false,
    message: "Required",
    regmessage: "Email address is required"
  },
  city: {
    name: "city",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  state: {
    name: "state",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  country: {
    name: "country",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  community: {
    name: "community",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  twitter: {
    name: "twitter",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  linkedin: {
    name: "linkedin",
    value: "",
    required: false,
    error: false,
    message: "Required"
  },
  expertise: {
    name: "expertise",
    value: "",
    required: true,
    error: false,
    message: "Select a choice"
  },
  briefly: {
    name: "briefly",
    value: "",
    required: true,
    error: false,
    message: "Required"
  },
  channel: {
    name: "channel",
    value: "",
    required: true,
    error: false,
    message: "Select a choice"
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
      formData: {...JSON.parse(JSON.stringify(rules))},
      showOther: false,
      comingToast: false,
      errorTip: ''
    }
  }


  handleChange = (prop) => (event) => {
    if(prop == "expertise" || prop == "channel"){
      let _v = event.target.defaultValue
      this.state.formData[prop].value = _v

      if(prop === "channel" && _v === "Other"){
        this.setState({showOther:true});
      }else if(prop === "channel" && _v != "Other"){
        this.setState({showOther:false});
      }
      
    }else{
      this.state.formData[prop].value = event.target.value
    }

    this.setState({formData: {...this.state.formData}})
  }


  validate = () => {
    let _formData = Object.assign({},this.state.formData)
    let _flag = true;

    Object.keys(_formData).forEach((key)=>{
      if(_formData[key].required && !_formData[key].value){
        _formData[key].error = true;
        _flag = false;
      }else{
        _formData[key].error = false;
      }

      if(key == "email" && _formData[key].value){
        let _reg = new RegExp(_formData[key].reg);
        if(!(_reg.test(_formData[key].value))){
          _formData[key].regerror = true;
          _flag = false;
        }else{
          _formData[key].regerror = false;
        }
      }
    });

    this.setState({formData: _formData})

    return _flag;
  }

  makeParam = () => {
    let _param = {}
    // Object.keys(this.state.formData).forEach((key)=>{
      // if(key = "referralEmail"){
      //   _param['refemail'] = this.state.formData[key].value;
      // }else{
      //   _param[key] = this.state.formData[key].value;
      // }
    // });
    _param.refemail   = this.state.formData.referralEmail.value
    _param.email      = this.state.formData.email.value
    _param.firstname  = this.state.formData.firstname.value
    _param.lastname   = this.state.formData.lastname.value
    _param.contry     = this.state.formData.country.value
    _param.city       = this.state.formData.city.value
    _param.state      = this.state.formData.state.value
    _param.twitter    = this.state.formData.twitter.value
    _param.linkedin   = this.state.formData.linkedin.value
    _param.socialsize = this.state.formData.community.value
    _param.expertise  = this.state.formData.expertise.value
    _param.about      = this.state.formData.briefly.value
    _param.hearfrom   = this.state.formData.channel.value
    if(this.state.formData.channel.value == "Other"){
      _param.hearfrom   = this.state.formData.otherchannel.value
    }
    

    return _param;
  }

  submit = () => {
    let _param = this.makeParam();
    let _validate = this.validate();
    if(!_validate){
      return;
    }

    submit(_param).then((res)=>{
      if(res.code == 1){
        this.props.nextStep();
        let _d = {...JSON.parse(JSON.stringify(rules))}
        this.setState({formData: _d})
      }else{
        this.setState({
          comingToast: true,
          errorTip: res.msg,
        })
        setTimeout(()=>{
          this.setState({
            comingToast: false,
            errorTip: "",
          })
        }, 3000)
      }
    }).catch((e)=>{
      console.log("e:",e)
    })
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
                <TextField id="referralEmail" 
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
                <h2>Contact information<span>*</span></h2>
              </div>
              <div className="gcontent">
                  <span className="orangeBlock"></span>
                  <div className="label">Your Name</div>
                  <div className="multiColumn">
                      <div className="controlWrap">
                        <FormControl variant="standard"  className="mr20">
                          <TextField id="firstname" 
                            className="input" 
                            placeholder="First" 
                            variant="outlined" 
                            value = {this.state.formData.firstname.value}
                            error = {this.state.formData.firstname.error}
                            helperText={this.state.formData.firstname.error ? 
                                    this.state.formData.firstname.message : ''}
                            onChange={this.handleChange('firstname')}
                          />
                        </FormControl>
                      </div>
                      <div className="controlWrap">
                        <FormControl variant="standard"> 
                          <TextField id="lastname" 
                            className="input" 
                            placeholder="Last" 
                            variant="outlined"
                            value = {this.state.formData.lastname.value}
                            error = {this.state.formData.lastname.error}
                            helperText= {this.state.formData.lastname.error ? 
                                this.state.formData.lastname.message : null}
                            onChange={this.handleChange('lastname')}
                          />
                        </FormControl>
                      </div>
                  </div>
                  <div className="label mt9">Your E-mail</div>
                  <div >
                    <FormControl variant="standard">
                      <TextField id="email"
                        className="input"
                        placeholder="E-mail address"
                        variant="outlined"
                        value = {this.state.formData.email.value}
                        error = {this.state.formData.email.error || this.state.formData.email.regerror}
                        helperText= {this.state.formData.email.error ? 
                            this.state.formData.email.message: 
                              (this.state.formData.email.regerror ? 
                              this.state.formData.email.regmessage : null)}
                        onChange={this.handleChange('email')}
                      />
                    </FormControl>
                  </div>
                  <div className="label mt9">Your Location</div>
                  <div className="multiColumn">
                    <div className="controlWrap">
                      <FormControl variant="standard"  className="mr20">
                        <TextField id="city"
                          className="input"
                          placeholder="City"
                          variant="outlined"
                          value = {this.state.formData.city.value}
                          error = {this.state.formData.city.error}
                          helperText= {this.state.formData.city.error ? 
                              this.state.formData.city.message : null}
                          onChange={this.handleChange('city')}
                        />
                      </FormControl>
                    </div>
                    <div className="controlWrap">
                      <FormControl variant="standard"> 
                        <TextField id="outlined-basic" 
                          className="input" 
                          placeholder="State/Region/Province"
                          variant="outlined"
                          value = {this.state.formData.state.value}
                          error = {this.state.formData.state.error}
                          helperText= {this.state.formData.state.error ?
                              this.state.formData.state.message: null}
                          onChange={this.handleChange('state')}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormControl sx={{ m: 1, width: 300 }} className="mt24 selectWrap">
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                      labelId="country"
                      id="country"
                      className="select"
                      // multiple
                      value={this.state.formData.country.value}
                      // error = {this.state.formData.country.error}
                      helperText= {this.state.formData.country.message}
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
                    {
                    this.state.formData.country.error ?
                    <p className="tip">{this.state.formData.country.message}</p>
                    : null
                  }
                </FormControl>
              </div>
            </div>

            <div className="formGroupWrap socialMedia">
              <div className="gheader">
                <h2>Your social media</h2>
              </div>
              <div className="gcontent">
                  <span className="orangeBlock"></span>

                  <div className="label mt9">What is the size of the community you can reach directly<span>*</span></div>
                  <div >
                    <FormControl variant="standard">
                      <TextField id="community" 
                        className="input" 
                        placeholder="Please enter the community size" 
                        variant="outlined"
                        value={this.state.formData.community.value}
                        error = {this.state.formData.community.error}
                        helperText= {this.state.formData.community.error ?
                           this.state.formData.community.message : null}
                        onChange={this.handleChange('community')}
                      />
                    </FormControl>
                  </div>
                  <div className="label mt9">Your Twitter URL<span>*</span></div>
                  <div >
                    <FormControl variant="standard">
                      <TextField id="twitter" 
                        className="input" 
                        placeholder="Your Twitter URL" 
                        variant="outlined" 
                        value={this.state.formData.twitter.value}
                        error = {this.state.formData.twitter.error}
                        helperText= {this.state.formData.twitter.error ? 
                            this.state.formData.twitter.message: null}
                        onChange={this.handleChange('twitter')}
                      />
                    </FormControl>
                  </div>
                  <div className="label mt9">Your Linkedin URL</div>
                  <div >
                    <FormControl variant="standard">
                      <TextField id="linkedin" 
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
              <h2>Your area of expertise<span>*</span></h2>
            </div>
            <div className="gcontent">
              <div className="checkboxWrap expertise">
                <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="controlled-radio-buttons-group"
                      value={this.state.formData.expertise.value}
                      // error = {this.state.formData.expertise.error}
                      helperText= {this.state.formData.expertise.message}
                      onChange={this.handleChange("expertise")}
                    >
                      {this.renderCheckboxCom(expertise)}
                    </RadioGroup>
                </FormControl>
                  {
                    this.state.formData.expertise.error ?
                    <p className="tip">{this.state.formData.expertise.message}</p>
                    : null
                  }
              </div>
            </div>
          </div>

          <div className="formGroupWrap mt24">
            <div className="gheader">
              <h2>Please briefly tell us about yourself<span>*</span></h2>
            </div>
            <div className="gcontent">
                <span className="orangeBlock"></span>
                  <textarea
                    placeholder="You can share your relavant experience and resources"
                    className="input userBriefly"
                    id="briefly"
                    value={this.state.formData.briefly.value}
                    onChange={this.handleChange('briefly')}
                  ></textarea>
                  {
                    this.state.formData.briefly.error ?
                    <p className="tip">{this.state.formData.briefly.message}</p>
                    : null
                  }
                  
            </div>
          </div>

          <div className="formGroupWrap mt24">
            <div className="gheader">
              <h2>How did you hear about Dmail<span>*</span></h2>
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
                    <FormControlLabel value="Other" 
                      control={<Radio sx={{
                          color: orange,
                        '&.Mui-checked': {
                          color: orange,
                        },
                      }}/>} label="Other" />
                    <div>
                      {this.state.showOther ? 
                        <FormControl variant="standard">
                            <TextField 
                              id="otherchannel" 
                              className="input" 
                              placeholder="Fill in your own" 
                              variant="outlined" 
                              onChange={this.handleChange('otherchannel')}
                            />
                        </FormControl>
                        : null 
                      }
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
                {
                    this.state.formData.channel.error ?
                    <p className="tip">{this.state.formData.channel.message}</p>
                    : null
                }
              </div>
            </div>
          </div>
          <div className="formGroupWrap mt35">
            <Button variant="contained" className="btn submit" onClick={this.submit}>
              submit
            </Button>
            <Button variant="outlined" className="btn back" onClick={this.props.preStep}>
              back
            </Button>
          </div>
        </div>

        <div className={this.state.comingToast ? "toastWrap show": "toastWrap hidden"}>
          <div className="content">
            {/* <img src={rocketIcon}></img> */}
            <span className="tip">{this.state.errorTip}</span>
          </div>
        </div>
      </Step2>
    );
  }
}
export default Step2Component