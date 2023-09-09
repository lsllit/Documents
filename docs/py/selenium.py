url = 'https://united.com'


import sys,atexit
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
ctrl = Keys.COMMAND if sys.platform == 'darwin' else Keys.CONTROL



driver = webdriver.Firefox()

@atexit.register
def program_finish():
	driver.quit()

driver.get(url)

sleep(1)


origin = driver.find_element(By.ID,'bookFlightOriginInput')
destination = driver.find_element(By.ID,'bookFlightDestinationInput')
submitbutton = driver.find_element(By.CSS_SELECTOR,'.app-components-BookFlightForm-bookFlightForm__findFlightBtn--1lbFe')

ActionChains(driver)\
.click(origin)\
.key_down(ctrl)\
.send_keys('a')\
.key_up(ctrl)\
.send_keys('SFO')\
.click(destination)\
.send_keys('JFK')\
.click(submitbutton)\
.perform()

sleep(100)
