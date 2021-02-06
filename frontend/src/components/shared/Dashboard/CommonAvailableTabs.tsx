import { AppBar, makeStyles, Paper, Theme } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { TabPanel } from "@material-ui/lab";
import PhoneIcon from "@material-ui/icons/Phone";
import React from "react";
import {
  CommonAvailableCategory,
  CommonByPeopleElement,
  TimeAvailable
} from "../../../../../types";
import { CommonAvailableElement } from "../CommonAvailableElement/CommonAvailableElement";
import { CommonAvailableCategoryGroup } from "./CommonAvailableCategoryGroup";
import { CategoryTitle } from "../../../pages/dashboard/CategoryTitle";

interface CommonAvailableTabsProps {
  commonAvailableCategory: CommonAvailableCategory;
  commonAvailable: TimeAvailable;
  participantCount: number;
}

const useTabBarStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#387DAB"
  },
  indicator: {
    backgroundColor: "#F7DC6A",
    height: 3.7
  }
}));

const useTabListStyle = makeStyles({
  root: {
    padding: 5,
    backgroundColor: "#92d3ff",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    minHeight: "100px"
  }
});

export const CommonAvailableTabs: React.FC<CommonAvailableTabsProps> = props => {
  const { commonAvailableCategory, commonAvailable, participantCount } = props;

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const categoryIndexes = [1, 2, 3, 4];

  const tabBarClass = useTabBarStyles();
  const tabListClass = useTabListStyle();

  return (
    <>
      <TabContext value={value}>
        <AppBar position='static' color='default' className={tabBarClass.root}>
          <TabList
            centered={true}
            value={value}
            indicatorColor='primary'
            textColor='primary'
            aria-label='disabled tabs example'
            onChange={handleChange}
            classes={{ indicator: tabBarClass.indicator }}
          >
            {categoryIndexes.map(index => (
              <Tab
                icon={<CategoryTitle categoryType={index} />}
                value={index.toString()}
                classes={{ root: tabBarClass.root }}
              />
            ))}
          </TabList>
        </AppBar>

        {Object.keys(commonAvailableCategory).map((categoryIndex, i) => (
          <>
            <TabPanel value={(i + 1).toString()} className={tabListClass.root}>
              <CommonAvailableCategoryGroup
                key={i}
                category={commonAvailableCategory[+categoryIndex]}
                commonAvailable={commonAvailable}
                participantCount={participantCount}
                index={i + 1}
              />
            </TabPanel>
          </>
        ))}
      </TabContext>
    </>
  );
};
