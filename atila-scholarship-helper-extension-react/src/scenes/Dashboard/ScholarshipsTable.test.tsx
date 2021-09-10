import { chrome } from 'jest-chrome';
import { render, screen } from '@testing-library/react';
import { ChromeMock } from '../../services/ChromeMock';
import ScholarshipsTable from './ScholarshipsTable';

// TODO figure out how to mock Scholarships Data
xdescribe('<ScholarshipsTable />', () => {

    beforeEach(() => {
        chrome.storage.sync.get.mockImplementation((keyName, callback) => {
            callback(ChromeMock.storageData)
        })
    });

    it('renders a scholarship name', () => {
        render(<ScholarshipsTable />);
        const titleElement = screen.getByText(/Guidelines research – The ESTEN Foundation/i);
        expect(titleElement).toBeInTheDocument();
    });

});