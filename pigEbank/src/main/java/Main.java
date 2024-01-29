import java.util.*;
import java.lang.*;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        ArrayList<Account> accountsList = new ArrayList<>();
        boolean applicationRunning = true;
        while (applicationRunning) {
            int option = displayLoginScreen();
            switch (option) {
                case 1:
                    logIn(accountsList);
                    break;
                case 2:
                    Scanner input = new Scanner(System.in);
                    System.out.print("Username: ");
                    String username = input.nextLine();
                    System.out.print("Password: ");
                    String password = input.nextLine();
                    accountsList.add(new Account(username, password));
                    System.out.println("Your account has been created.");
                    break;
                case 3:
                    System.out.println("Thank you for using Pig E-Bank's services!");
                    applicationRunning = false;
                    System.exit(0);
                default:
                    System.out.println("Invalid Option.");
            }
        }
    }

    public static void logIn(ArrayList<Account> accountsList) {
        Scanner input = new Scanner(System.in);

        //implement a do while for data validation
        System.out.print("Username: ");
        String username = input.nextLine();
        System.out.print("Password: ");
        String password = input.nextLine();
        System.out.println();

        //fix this part, maybe == or .equals() is wrong
        for (int i = 0; i < accountsList.size(); i++)
            if (accountsList.get(i).getUsername() == (username) && accountsList.get(i).getPassword() == (password))
                    displayMenu(accountsList.get(i));
        //add exit, and option to go back to home page
    }

    public static void displayMenu(Account account){
        boolean loggedIn = true;
        while (loggedIn) {
            Scanner input = new Scanner(System.in);
            System.out.println("User: " + account.getUsername());
            System.out.println("1. View Overall Account Balance");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Set New Saving Goal");
            System.out.println("5. View Saving Goal");
            System.out.println("6. View All Saving Goals");
            System.out.println("7. Emergency Unlock");
            System.out.println("8. Lock");
            System.out.println("9. Logout");
            int option = Integer.parseInt(input.nextLine());

            //account for wanting to exit after selecting each option
            switch (option) {
                case 1:
                    System.out.println("Overall Account Balance" + account.getOverallBalance());
                    break;
                case 2:
                    System.out.println("Name of goal to deposit into:  ");
                    String depositName = input.nextLine();
                    System.out.println("How much do you want to deposit: ");
                    double depositAmount = Double.parseDouble(input.nextLine());
                    account.deposit(depositName, depositAmount);
                    break;
                case 3:
                    System.out.println("Name of goal to withdraw from:  ");
                    String withdrawName = input.nextLine();
                    System.out.println("How much do you want to deposit: ");
                    double withdrawAmount = Double.parseDouble(input.nextLine());
                    account.deposit(withdrawName, withdrawAmount);
                    break;
                case 4:
                    System.out.println("You've selected to set a new goal.");
                    System.out.println("Enter goal name/type: ");
                    String goalname = input.nextLine();
                    System.out.println("Enter desired goal amount: ");
                    double goalamount = Double.parseDouble(input.nextLine());
                    account.setNewGoal(goalname, goalamount);
                    System.out.println("Goal " + goalname + " has been set at $" + goalamount);
                    break;
                case 5:
                    System.out.println("Enter name of savings goal to be displayed.");
                    String goalName = input.nextLine();
                    account.displaySavingGoal(goalName);
                    break;
                case 6:
                    account.displayAllSavingsGoals();
                    break;
                case 7:
                    // emergency unlock
                    break;
                case 8:
                    //lock
                    break;
                case 9:
                    //logout
                    loggedIn = false;
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }

    public static int displayLoginScreen(){
        //get user input
        Scanner input = new Scanner(System.in);
        System.out.println("Hello!! Welcome to the Pig E-Bank:");
        System.out.println("1. Log in");
        System.out.println("2. Create New User");
        System.out.println("3. Exit");
        // Read user input
        int option = Integer.parseInt(input.nextLine());
        if(option == 1 || option == 2 || option == 3 )
            return option;
        return 0;
    }
}
