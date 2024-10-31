Vagrant.configure("2") do |config|
    config.vm.define "container-vm" do |gateway|
        gateway.vm.box = "bento/ubuntu-24.04"
        gateway.vm.hostname = "container-vm"
        gateway.vm.network "public_network"
        gateway.vm.provision "shell", path: "scripts/setup_vm.sh"
      end
    end