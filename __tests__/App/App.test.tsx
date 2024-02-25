import { fireEvent, render, waitFor} from '@testing-library/react';
import {App, countriesData} from '../../src/App';

describe('App Component Unit Test', () => {
  test('Every single country checkbox must toggle individually', () => {
    const { getByTestId } = render(<App />);

    countriesData.forEach( async (_, index: number) => {
      const country = getByTestId(`country${countriesData[index].id}`) as HTMLInputElement;
      fireEvent.click(country);
      
      await expectIsChecked(country)
  
      fireEvent.click(country);
  
      await expectIsNotChecked(country);
    });
  });

  test('Select All must toggle and update selected state of all countries', () => {
    const { getByTestId } = render(<App />);
    
    const selectAllCheckbox = getByTestId('selectAll');
    fireEvent.click(selectAllCheckbox);
    
    countriesData.forEach( async (_, index: number) => {
      const country = getByTestId(`country${countriesData[index].id}`) as HTMLInputElement;
      fireEvent.click(country);
      await expectIsChecked(country)
    });
    
    fireEvent.click(selectAllCheckbox);
    
    countriesData.forEach( async (_, index: number) => {
      const country = getByTestId(`country${countriesData[index].id}`) as HTMLInputElement;
      fireEvent.click(country);
      await expectIsNotChecked(country)
    });
  });
});

async function expectIsChecked(country: HTMLInputElement){
  return await waitFor(() => {
    expect(country.checked).toBeTruthy();
  });
}
async function expectIsNotChecked(country: HTMLInputElement){
  return await waitFor(() => {
    expect(country.checked).toBeFalsy();
  });
}
