Message Structure
========================================
Deepstream messages are transmitted using a proprietary, minimal, string-based protocol. Every message follows the same structure:

<div class="message-structure">
&lt;topic&gt;|&lt;action&gt;|&lt;data[0]&gt;|&lt;data[1]&gt;|&lt;data[n]&gt;+
</div>

<img src="../assets/images/message-structure-record-create.png" />
<img src="../assets/images/message-structure-record-patch.png" width="700"/>