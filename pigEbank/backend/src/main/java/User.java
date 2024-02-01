import java.util.regex.Pattern;
import java.util.*;
import java.lang.*;
public class User {
    private String username;
    private String password;

    public User(String username, String password) {
        if(checkValidPassword(password)){
            this.username = username;
            this.password = password;
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
    public boolean checkValidPassword(String pwd)
        { return Pattern.matches("^(?=.*[0-9]).{8,}$", pwd); }
}