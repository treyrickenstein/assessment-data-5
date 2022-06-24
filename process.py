log_file = open("um-server-01.txt")


def sales_reports(log_file):
    for line in log_file:
        line = line.rstrip()
        day = line[0:3]
        if day == "Tue":
            print(line)


sales_reports(log_file)
# The um-server-01 is about the different types of watermelons that were delivered to different users on a watermelon delivery service website.
