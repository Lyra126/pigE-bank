import java.util.*;
import java.lang.*;
public class Account {
    private double overallBalance;
    ArrayList<Goal> goals = new ArrayList<>();
    private User user;

    public Account(String username, String password){
        overallBalance = 0.0;
        user = new User(username, password);
    }

    public final double getOverallBalance(){
        return overallBalance;
    }

    public void setNewGoal(String goalName, double goalAmount){
        goals.add(new Goal(goalName, goalAmount));
    }

    public void displayAllSavingsGoals(){
        //display all saving goals and progress
    }

    public void displaySavingGoal(String goalName){
        //display certain saving goal and progress
    }

    public String getUsername(){
        return user.getUsername();
    }

    public String getPassword(){
        return user.getPassword();
    }

    public void withdraw(String goalName, double amount){
        overallBalance -= amount;
        for (Goal goal : goals)
            if (goal.getGoalName().equals(goalName))
                goal.withdraw(amount);
    }

    public void deposit(String goalName, double amount){
        overallBalance += amount;
        for (Goal goal : goals)
            if (goal.getGoalName().equals(goalName))
                goal.deposit(amount);
    }
}
