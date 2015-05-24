Building a Data-Provider
===========================================
Let's build a data provider for foreign exchange (FX) rates. Why FX? Because it's a great example of data that is dynamically created when a client requests it and therefor let's us use deepstream's `listen` feature.

FX rates are usually stored as &lt;currency&gt; against Dollar. So if a client wants out how many Euro's we'd get for a Pound sterling, we would need to look up how many dollars we get for a pound