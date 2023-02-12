import '@elastic/eui/dist/eui_theme_dark.css';
import React from 'react'
import {
  EuiText,
  EuiPageTemplate,
  EuiProvider
} from '@elastic/eui';
import { StyleSheet } from 'react-native';
import Countdown from 'react-countdown';
const Completionist = () => <span>You are good to go!</span>;

export default function App() {
  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate
        panelled={true}
        restrictWidth={true}
        grow={true}
      >
        <EuiPageTemplate.Section
          grow={false}
          color="subdued"
        >
          <EuiText textAlign="center">
            <Countdown date={Date.now() + 5000}>
              <Completionist />
            </Countdown>
          </EuiText>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
