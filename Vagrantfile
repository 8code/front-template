Vagrant.configure(2) do |config|

  # CentOS 7.1
  config.vm.box = "centos7.1"
  config.vm.box_url = "https://github.com/CommanderK5/packer-centos-template/releases/download/0.7.1/vagrant-centos-7.1.box"
  config.vm.network "private_network", ip: "192.168.33.60"
  config.vm.synced_folder "", "/home/vagrant/dist", mount_options:['dmode=777','fmode=755']
  config.vm.provider "virtualbox" do |vb|

  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true

      # Customize the amount of memory on the VM:
      vb.memory = "1024"

      vb.customize ["modifyvm", :id, "--natdnsproxy1", "off"]
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "off"]
  end

  config.vm.provision "ansible" do |ansible|
    ansible.limit = 'all'
    ansible.inventory_path = "ansible/hosts"
    ansible.playbook = "ansible/development.yml"
  end

  config.vm.provision :shell, run: "always", :inline => <<-EOT
    sudo /bin/systemctl restart httpd.service
    sudo /bin/systemctl restart mysqld.service
  EOT
end
