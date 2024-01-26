import java.util.regex.Pattern;
import java.util.*;
import java.lang.*;
public class User {
    private String username;
    private String password;
    private Account account;

    public User(String username, String password, Account account) {
        if(checkValidPassword(password)){
            this.username = username;
            this.password = password;
            this.account = account;
        }
    }

    public final String getUsername()
        { return username; }
    public void setUsername(String username)
        { this.username = username; }
    public final String getPassword()
        { return password; }
    public void setPassword()
        { this.password = password; }
    public boolean checkValidPassword(String pwd) {
        return Pattern.matches("^(?=.*[0-9]).{8,}$", pwd);
    }

    public final double viewAccountBalance(){
        return account.getOverallBalance();
    }
}