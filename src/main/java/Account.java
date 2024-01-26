import java.util.*;
import java.lang.*;
public class Account {
    private double overallBalance;
    private Vector<Goal> goals;

    public Account(){
        overallBalance = 0.0;
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
}
