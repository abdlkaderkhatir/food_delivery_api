
export class OTP {
    static genearateOTP(degit : number = 6) : number{
        const degits = "1234567890";
        let otp = "";
        for(let i = 0; i < degit; i++){
            otp += degits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }
}