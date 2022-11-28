import LoginInputPhone from "../containers/LoginInputPhone"
import LoginInputCode from "../containers/LoginInputCode"
import urlConstant from "../constant/urlConstant"
import OnBoarding from "../containers/OnBoarding"
import Switch from "../../seyed-modules/components/Switch"
import Route from "../../seyed-modules/components/Route"

function Login()
{
    return (
        <Switch>
            <Route path={urlConstant.loginVerifyCode(":phone")} render={route => <LoginInputCode route={route}/>}/>
            <Route path={urlConstant.loginPhone} render={() => <LoginInputPhone/>}/>
            <Route path={urlConstant.login} render={() => <OnBoarding/>}/>
        </Switch>
    )
}

export default Login