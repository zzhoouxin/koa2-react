/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Checkbox, Input, Message} from '@alifd/next';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import {signInApi} from "./webApi";

@withRouter
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        userName: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll(async (errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }

      let data = await signInApi(values);
      if (data && data.success) {
        this.props.history.push('/');
        Message.success('登录成功');
      }else{
        Message.error(data.message || "出错啦~");
      }


    });
  };

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.title}>登 录</h4>
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.formChange}
          ref="form"
        >
          <div style={styles.formItems}>
            <div style={styles.formItem}>
              <IceIcon type="person" size="small" style={styles.inputIcon} />
              <IceFormBinder name="userName" required message="必填">
                <Input
                  size="large"
                  maxLength={20}
                  placeholder="用户名"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="userName"/>
            </div>

            <div style={styles.formItem}>
              <IceIcon type="lock" size="small" style={styles.inputIcon} />
              <IceFormBinder name="password" required message="必填">
                <Input
                  size="large"
                  htmlType="password"
                  placeholder="密码"
                  style={styles.inputCol}
                />
              </IceFormBinder>
              <IceFormError name="password" />
            </div>

            <div style={styles.formItem}>
              <IceFormBinder name="checkbox">
                <Checkbox style={styles.checkbox}>记住账号</Checkbox>
              </IceFormBinder>
            </div>

            <div style={styles.footer}>
              <Button
                type="primary"
                size="large"
                onClick={this.handleSubmit}
                style={styles.submitBtn}
              >
                登 录
              </Button>
              <Link to="/user/register" style={styles.tips}>
                立即注册
              </Link>
            </div>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '400px',
    padding: '40px',
    background: '#fff',
    borderRadius: '6px',
  },
  title: {
    margin: '0 0 40px',
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: '28px',
    fontWeight: '500',
    textAlign: 'center',
  },
  formItem: {
    position: 'relative',
    marginBottom: '20px',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    color: '#666',
  },
  inputCol: {
    width: '100%',
    paddingLeft: '20px',
  },
  submitBtn: {
    width: '100%',
  },
  tips: {
    marginTop: '20px',
    display: 'block',
    textAlign: 'center',
  },
};

export default UserLogin;
